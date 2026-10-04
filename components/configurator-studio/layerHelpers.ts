import { ConfiguratorGroup, ConfiguratorLayerOption } from "@/lib/db";

export function reorderItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (toIndex < 0 || toIndex >= list.length || fromIndex === toIndex) return list;
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export function moveOptionAcrossGroups(
  groups: ConfiguratorGroup[],
  sourceGroupId: string,
  fromIndex: number,
  targetGroupId: string,
  toIndex: number
): ConfiguratorGroup[] {
  if (sourceGroupId === targetGroupId) {
    return groups.map((g) => {
      if (g.id !== sourceGroupId) return g;
      return { ...g, options: reorderItem(g.options, fromIndex, toIndex) };
    });
  }

  const sourceGroup = groups.find((g) => g.id === sourceGroupId);
  const targetGroup = groups.find((g) => g.id === targetGroupId);
  if (!sourceGroup || !targetGroup) return groups;

  const itemToMove = sourceGroup.options[fromIndex];
  if (!itemToMove) return groups;

  return groups.map((g) => {
    if (g.id === sourceGroupId) {
      const newOptions = [...g.options];
      newOptions.splice(fromIndex, 1);
      return { ...g, options: newOptions };
    }
    if (g.id === targetGroupId) {
      const newOptions = [...g.options];
      const validToIndex = Math.max(0, Math.min(toIndex, newOptions.length));
      newOptions.splice(validToIndex, 0, itemToMove);
      return { ...g, options: newOptions };
    }
    return g;
  });
}

export function duplicateLayerOption(
  opt: ConfiguratorLayerOption,
  newIndex: number
): ConfiguratorLayerOption {
  return {
    ...opt,
    id: `opt-${Date.now()}-${newIndex}`,
    name: `${opt.name} (Copy)`,
    x: Math.min(opt.x + 5, 90),
    y: Math.min(opt.y + 5, 90),
    zIndex: opt.zIndex + 1,
  };
}

export function createDefaultGroup(index: number, viewId: string): ConfiguratorGroup {
  const newGId = `grp-${Date.now()}`;
  return {
    id: newGId,
    title: `Group Layer ${index + 1}`,
    controlType: "icon",
    required: false,
    multiple: false,
    initialState: "open",
    options: [
      {
        id: `opt-${Date.now()}-img`,
        name: "Image 1",
        controlType: "icon",
        iconUrl: "🖼️",
        priceAdd: 0,
        activeOnLoad: true,
        x: 50,
        y: 50,
        width: 80,
        height: 80,
        zIndex: index + 1,
        viewId,
      },
    ],
  };
}

export function createSubGroup(index: number, viewId: string): ConfiguratorGroup {
  const newSubGId = `grp-sub-${Date.now()}`;
  return {
    id: newSubGId,
    title: `Sub Group ${index + 1}`,
    controlType: "icon",
    required: false,
    multiple: false,
    initialState: "open",
    options: [
      {
        id: `opt-${Date.now()}-sub`,
        name: "Sub Image 1",
        controlType: "icon",
        iconUrl: "📦",
        priceAdd: 0,
        activeOnLoad: true,
        x: 50,
        y: 50,
        width: 70,
        height: 70,
        zIndex: index + 2,
        viewId,
      },
    ],
  };
}

export function createImageLayer(count: number, viewId: string): ConfiguratorLayerOption {
  return {
    id: `opt-img-${Date.now()}`,
    name: `Image ${count + 1}`,
    controlType: "icon",
    iconUrl: "🖼️",
    priceAdd: 0,
    activeOnLoad: true,
    x: 50,
    y: 50,
    width: 75,
    height: 75,
    zIndex: count + 1,
    viewId,
  };
}

export function duplicateGroupHelper(grp: ConfiguratorGroup): ConfiguratorGroup {
  const dupGId = `grp-${Date.now()}`;
  return {
    ...grp,
    id: dupGId,
    title: `${grp.title} (Copy)`,
    options: grp.options.map((o, idx) => ({ ...o, id: `opt-${Date.now()}-${idx}` })),
  };
}

