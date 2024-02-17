import { TreeItem } from "../types";
interface TraverseTreeFunctions {
    insertNode: (tree: TreeItem, folderId: number, item: string, isFolder: boolean) => TreeItem;
    deleteNode: (tree: TreeItem, nodeIdToDelete: number) => TreeItem; // Placeholder type, implement as needed
    renameNode: (tree: TreeItem, nodeId: number, newName: string) => TreeItem; // Placeholder type, implement as needed
  }
function useTraverseTree(): TraverseTreeFunctions {
    function insertNode(tree: TreeItem, folderId: number, item: string, isFolder: boolean): TreeItem {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder: isFolder,
                items: [],
            });
            return tree;
        }

        const latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
        });

        return { ...tree, items: latestNode };
        
    }

    function deleteNode(tree: TreeItem, nodeIdToDelete: number): TreeItem {
        if (tree.id === nodeIdToDelete) {
            // Return an empty node to delete it
            return { id: 0, name: "", isFolder: false, items: [] };
          }
        
          const updatedItems = tree.items
            .filter((item) => item.id !== nodeIdToDelete)
            .map((item) => deleteNode(item, nodeIdToDelete));
        
          return { ...tree, items: updatedItems };
    }

    function renameNode(tree: TreeItem, nodeId: number, newName: string): TreeItem {
        if (tree.id === nodeId) {
            return { ...tree, name: newName };
          }
        
          const updatedItems = tree.items.map((item) => renameNode(item, nodeId, newName));
        
          return { ...tree, items: updatedItems };
    }
    
    return {
        insertNode,
        deleteNode,
        renameNode
    }
}

export default useTraverseTree;