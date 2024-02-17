export interface TreeItem {
    id: string;
    name: string;
    isFolder: boolean;
    items: TreeItem[];
}