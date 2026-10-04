import { useState } from "react";

export function useStudioLayerToggles(selectedGroupId: string) {
  const [lockedGroupIds, setLockedGroupIds] = useState<string[]>([]);
  const [hiddenGroupIds, setHiddenGroupIds] = useState<string[]>([]);
  const [lockedOptionIds, setLockedOptionIds] = useState<string[]>([]);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);

  const toggleLockGroup = (id?: string) => {
    const targetId = id || selectedGroupId;
    if (!targetId) return;
    setLockedGroupIds((p) =>
      p.includes(targetId) ? p.filter((x) => x !== targetId) : [...p, targetId]
    );
  };

  const toggleHideGroup = (id?: string) => {
    const targetId = id || selectedGroupId;
    if (!targetId) return;
    setHiddenGroupIds((p) =>
      p.includes(targetId) ? p.filter((x) => x !== targetId) : [...p, targetId]
    );
  };

  const toggleLockOption = (id: string) => {
    setLockedOptionIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const toggleHideOption = (id: string) => {
    setHiddenOptionIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return {
    lockedGroupIds,
    hiddenGroupIds,
    lockedOptionIds,
    hiddenOptionIds,
    toggleLockGroup,
    toggleHideGroup,
    toggleLockOption,
    toggleHideOption,
  };
}
