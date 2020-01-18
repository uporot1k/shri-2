export function getContentBlock(children) {
  return children.find(child => child.key.value === "content").value;
}

export function getModValueByType(node, type) {
  const { children } = node;

  const modsNode = children.filter(
    el => el.key.value === "mods" || el.key.value === "elemMods"
  )[0];
  if (modsNode) {
    const modsEntries = modsNode.value.children;
    const modGroupedByType = modsEntries.filter(el => el.key.value === type)[0];
    return modGroupedByType ? modGroupedByType.value.value : undefined;
  }

  return false;
}
