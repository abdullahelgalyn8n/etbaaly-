"use client";

import { useState } from "react";
import { ConfiguratorGroup, ConfiguratorLayerOption } from "@/lib/db";
import { defaultGroups } from "./initialData";
import {
  reorderItem,
  moveOptionAcrossGroups,
  duplicateLayerOption,
  createDefaultGroup,
  createSubGroup,
  createImageLayer,
  duplicateGroupHelper,
} from "./layerHelpers";
import { useStudioLayerToggles } from "./useStudioLayerToggles";

export function useStudioLayers(
  initialGroups?: ConfiguratorGroup[],
  activeViewId: string = "v-front"
) {
  const [groups, setGroups] = useState<ConfiguratorGroup[]>(
    initialGroups?.length ? initialGroups : defaultGroups
  );
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || "");
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    groups[0]?.options[0]?.id || ""
  );

  const {
    lockedGroupIds,
    hiddenGroupIds,
    lockedOptionIds,
    hiddenOptionIds,
    toggleLockGroup,
    toggleHideGroup,
    toggleLockOption,
    toggleHideOption,
  } = useStudioLayerToggles(selectedGroupId);

  const activeGroup = groups.find((g) => g.id === selectedGroupId);
  const activeOption = activeGroup?.options.find((o) => o.id === selectedOptionId) || null;

  const handleAddGroup = () => {
    const newGroup = createDefaultGroup(groups.length, activeViewId);
    setGroups([...groups, newGroup]);
    setSelectedGroupId(newGroup.id);
    setSelectedOptionId(newGroup.options[0].id);
  };

  const handleAddSubGroup = (targetGroupId?: string) => {
    const newSubGroup = createSubGroup(groups.length, activeViewId);
    setGroups([...groups, newSubGroup]);
    setSelectedGroupId(newSubGroup.id);
    setSelectedOptionId(newSubGroup.options[0].id);
  };

  const handleAddImageLayer = (targetGroupId?: string) => {
    const gId = targetGroupId || selectedGroupId || groups[0]?.id;
    if (!gId) return;
    const targetGroup = groups.find((g) => g.id === gId);
    const count = targetGroup?.options.length || 0;
    const newOpt = createImageLayer(count, activeViewId);
    setGroups(
      groups.map((g) => (g.id === gId ? { ...g, options: [...g.options, newOpt] } : g))
    );
    setSelectedGroupId(gId);
    setSelectedOptionId(newOpt.id);
  };

  const moveGroup = (fromIndex: number, toIndex: number) => {
    setGroups((prev) => reorderItem(prev, fromIndex, toIndex));
  };

  const moveOption = (groupId: string, fromIndex: number, toIndex: number) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return { ...g, options: reorderItem(g.options, fromIndex, toIndex) };
      })
    );
  };

  const moveOptionAcross = (
    sourceGroupId: string,
    fromIndex: number,
    targetGroupId: string,
    toIndex: number
  ) => {
    setGroups((prev) =>
      moveOptionAcrossGroups(prev, sourceGroupId, fromIndex, targetGroupId, toIndex)
    );
  };

  const deleteGroup = (groupId: string) => {
    if (groups.length <= 1) return;
    const filtered = groups.filter((g) => g.id !== groupId);
    setGroups(filtered);
    if (selectedGroupId === groupId) {
      setSelectedGroupId(filtered[0].id);
      setSelectedOptionId(filtered[0].options[0]?.id || "");
    }
  };

  const duplicateActiveGroup = (groupId?: string) => {
    const targetId = groupId || selectedGroupId;
    const grp = groups.find((g) => g.id === targetId) || activeGroup;
    if (!grp) return;
    const duplicated = duplicateGroupHelper(grp);
    setGroups([...groups, duplicated]);
    setSelectedGroupId(duplicated.id);
    setSelectedOptionId(duplicated.options[0]?.id || "");
  };

  const duplicateOption = (groupId: string, optionId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const opt = g.options.find((o) => o.id === optionId);
        if (!opt) return g;
        const copy = duplicateLayerOption(opt, g.options.length + 1);
        return { ...g, options: [...g.options, copy] };
      })
    );
  };

  const updateActiveOption = (patch: Partial<ConfiguratorLayerOption>) => {
    if (!selectedGroupId || !selectedOptionId) return;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== selectedGroupId) return g;
        return {
          ...g,
          options: g.options.map((o) => (o.id === selectedOptionId ? { ...o, ...patch } : o)),
        };
      })
    );
  };

  const updateGroup = (groupId: string, patch: Partial<ConfiguratorGroup>) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, ...patch } : g)));
  };

  const deleteActiveOption = (optionId?: string, groupId?: string) => {
    const optId = optionId || selectedOptionId;
    const gId = groupId || selectedGroupId;
    if (!gId || !optId) return;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gId) return g;
        return { ...g, options: g.options.filter((o) => o.id !== optId) };
      })
    );
    if (selectedOptionId === optId) setSelectedOptionId("");
  };

  return {
    groups,
    setGroups,
    selectedGroupId,
    setSelectedGroupId,
    selectedOptionId,
    setSelectedOptionId,
    activeGroup,
    activeOption,
    lockedGroupIds,
    hiddenGroupIds,
    lockedOptionIds,
    hiddenOptionIds,
    toggleLockGroup,
    toggleHideGroup,
    toggleLockOption,
    toggleHideOption,
    handleAddGroup,
    handleAddSubGroup,
    handleAddImageLayer,
    moveGroup,
    moveOption,
    moveOptionAcross,
    deleteGroup,
    duplicateActiveGroup,
    duplicateOption,
    updateActiveOption,
    updateGroup,
    deleteActiveOption,
  };
}
