function renderAddTableDocsPopup() {
    const newRow = document.createElement('tr');
    const addFirstCell = document.createElement('td');
    const addSecondCell = document.createElement('td');
    const addThirdCell = document.createElement('td');
    const tittleCell = document.createElement('div');
    const tittleCellVersion = document.createElement('div');
    /**
    
    tittleCell.textContent = doc.Title;
    tittleCellVersion.textContent = doc.Version;
    
    
    addFirstCell.appendChild(tittleCell).appendChild(tittleCellVersion);
    newRow.appendChild(addFirstCell);
    addSecondCell.textContent = doc.Contributors.map(contributor => `${contributor.Name || contributor.ID}`).join(' ')
    newRow.appendChild(addSecondCell);
    addThirdCell.textContent = doc.Attachments.join(', ')
    newRow.appendChild(addThirdCell);

    container.appendChild(newRow);
     *
     */
    return [];
}
export {};
