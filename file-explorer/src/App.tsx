import { useState } from "react";
import explorer from "./data/folder-data";
import Folder from "./components/folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./App.css";

function App() {
    const [explorerData, setExplorerData] = useState(explorer);
    const { insertNode, deleteNode, renameNode } = useTraverseTree();

    const handleInsertNode = (folderId: number, item: string, isFolder: boolean) => {
        const finalTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(finalTree);
    };

    const handleDeleteNode = (nodeId: number) => {
        const finalTree = deleteNode(explorerData, nodeId);
        setExplorerData(finalTree);
    };

    const handleRenameNode = (nodeId: number, newName: string) => {
        const finalTree = renameNode(explorerData, nodeId, newName);
        setExplorerData(finalTree);
    };

    return (
        <div>
            <Folder
                explorer={explorerData}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
            />
        </div>
    );
}

export default App;
