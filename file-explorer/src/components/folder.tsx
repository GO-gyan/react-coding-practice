import React, { useState } from "react";
import { TreeItem } from "../types";

interface FolderProps {
    explorer: TreeItem;
    handleInsertNode: (folderId: number, item: string, isFolder: boolean) => void;
    handleDeleteNode: (nodeId: number) => void;
    handleRenameNode: (nodeId: number, newName: string) => void;
}

const Folder = ({ explorer, handleInsertNode, handleDeleteNode, handleRenameNode }: FolderProps) => {
    const [expand, setExpand] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [explorerName, setExplorerName] = useState(explorer.name);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });

    const handleNewFolder = (event: MouseEvent<HTMLButtonElement, MouseEvent>, isFolder: boolean) => {
        event.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder: isFolder,
        });
    };

    const handleEditToggle = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setIsEditable(!isEditable);
    };

    const handleInputClick = (event: MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const handleRenameSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 && event.target.value) {
            handleRenameNode(explorer.id, explorerName);
            setIsEditable(false);
        }
    };

    const onAddFolder = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 && event.target.value) {
            handleInsertNode(explorer.id, event.target.value, showInput.isFolder);
            setShowInput({
                ...showInput,
                visible: false,
            });
        }
    };
    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5 }}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span style={{ display: isEditable ? "none" : "block" }}>📁 {explorer.name}</span>
                    {isEditable ? (
                        <input
                            type="text"
                            value={explorerName}
                            onClick={handleInputClick}
                            className="input-container__input"
                            autoFocus
                            onChange={(e) => setExplorerName(e.target.value)}
                            // onBlur={handleRenameSubmit}
                            onKeyDown={handleRenameSubmit}
                        />
                    ) : (
                        <>
                            {explorer.id !== "1" && (
                                <div className="icon-container">
                                    <button className="edit-icon" onClick={handleEditToggle} />
                                    <button className="delete-icon" onClick={() => handleDeleteNode(explorer.id)} />
                                </div>
                            )}
                            <div>
                                <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                                <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
                            </div>
                        </>
                    )}
                </div>
                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                    {showInput.visible && (
                        <div className="input-container">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                type="text"
                                placeholder="New Name"
                                className="input-container__input"
                                autoFocus
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                                onKeyDown={onAddFolder}
                            />
                        </div>
                    )}
                    {explorer.items.map((item) => (
                        <Folder
                            key={item.id}
                            explorer={item}
                            handleInsertNode={handleInsertNode}
                            handleDeleteNode={handleDeleteNode}
                            handleRenameNode={handleRenameNode}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="file">
                <span style={{ display: isEditable ? "none" : "block" }}>📄 {explorer.name}</span>
                {isEditable ? (
                    <input
                        type="text"
                        value={explorerName || explorer.name}
                        onClick={handleInputClick}
                        className="input-container__input"
                        autoFocus
                        onChange={(e) => setExplorerName(e.target.value)}
                        // onBlur={handleRenameSubmit}
                        onKeyDown={handleRenameSubmit}
                    />
                ) : (
                    <div className="icon-container">
                        <button className="edit-icon" onClick={handleEditToggle} />
                        <button className="delete-icon" onClick={() => handleDeleteNode(explorer.id)} />
                    </div>
                )}
            </div>
        );
    }
};

export default Folder;
