var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let container = document.getElementById('document-list-table');
const userActivityListMapper = (userActivityList) => {
    return {
        Timestamp: userActivityList.Timestamp,
        UserID: userActivityList.UserID,
        UserName: userActivityList.UserName,
        DocumentID: userActivityList.DocumentID,
        DocumentTitle: userActivityList.DocumentTitle,
    };
};
const documentListMapper = (documentList) => {
    return documentList.map(document => {
        return {
            ID: document.ID,
            CreatedAt: document.CreatedAt,
            UpdatedAt: document.UpdatedAt,
            Title: document.Title,
            Attachments: document.Attachments,
            Contributors: [{
                    ID: document.ID,
                    Name: document.Name
                }],
            Version: document.Version,
        };
    });
};
//let DocumentList: DocumentResponseModel [] = []
// Get references to the DOM elements
const selectOption = document.getElementById('selectOption');
const tableTitles = document.getElementById('table-titles');
const firstButtonToggle = document.getElementById('default-toggle');
const toggleLayoutButton = document.getElementById('second-toggle');
const addButton = document.getElementById('add-new-document-button');
const formDiv = document.getElementById('add-document-form');
const submitButton = document.getElementById('submit-document');
const cancelButton = document.getElementById('cancel-document');
const tableBody = document.getElementById('document-list-table');
const notificationButton = document.getElementById('notification');
const notificationNumber = document.getElementById('notification-number');
const notificationMessage = document.getElementById('notification-message');
let documents = [];
let documentsToAdd = [];
function fetchDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //find endpoint
            const response = yield fetch('http://localhost:8080/documents');
            if (!response.ok) {
                throw new Error(`HTTP ERROR STATUS ${response.status}`);
            }
            const data = yield response.json();
            documents = documentListMapper(data);
            return documents;
        }
        catch (error) {
            console.error('Error fetching document list ', error);
        }
    });
}
function checkUserActivity() {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = new WebSocket('ws://localhost:8080/notifications');
        socket.onopen = () => {
            socket.onmessage = (event) => {
                try {
                    notificationMessage.innerText = '';
                    const data = JSON.parse(event.data);
                    const mappedData = userActivityListMapper(data);
                    if (mappedData.Timestamp) {
                        console.log('New document received from user:', mappedData.UserName);
                    }
                    notificationButton.style.display = 'absolute';
                    notificationNumber.innerText = `${mappedData.Timestamp.getMinutes}`;
                    notificationMessage.innerText = `Minutes ago. New document received from user: ${mappedData.UserName}`;
                    setTimeout(() => {
                        notificationButton.style.display = "none";
                    }, 3000);
                }
                catch (err) {
                    console.error('Error parsing WebSocket message as JSON:', err);
                }
            };
            socket.send('Connection established from user ');
            // Handle errors
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            // Handle connection close
            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        };
    });
}
function checkNewDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const previousDocumentTotal = documents.length;
            const newDocumentTotal = (yield fetchDocuments()) || [];
            if ((newDocumentTotal === null || newDocumentTotal === void 0 ? void 0 : newDocumentTotal.length) > previousDocumentTotal) {
                notificationButton.style.display = 'absolute';
                notificationNumber.innerText = `${newDocumentTotal.length - previousDocumentTotal}`;
                notificationMessage.innerText = `New document created!`;
                setTimeout(() => {
                    notificationButton.style.display = "none";
                }, 10000);
                removeChildNodes();
                newDocumentTotal.forEach(doc => renderDocumentRow(doc));
            }
        }
        catch (error) {
            console.error('Error fetching latest document list ', error);
        }
    });
}
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
function changeOrderSelect(docs) {
    if (selectOption.value) {
    }
}
function renderDocumentRow(doc) {
    const newRow = document.createElement('tr');
    const addFirstCell = document.createElement('td');
    const addSecondCell = document.createElement('td');
    const addThirdCell = document.createElement('td');
    const tittleCell = document.createElement('div');
    const tittleCellVersion = document.createElement('div');
    tittleCell.textContent = doc.Title;
    tittleCellVersion.textContent = doc.Version;
    addFirstCell.appendChild(tittleCell).appendChild(tittleCellVersion);
    newRow.appendChild(addFirstCell);
    addSecondCell.textContent = doc.Contributors.map(contributor => `${contributor.Name || contributor.ID}`).join(' ');
    newRow.appendChild(addSecondCell);
    addThirdCell.textContent = doc.Attachments.join(', ');
    newRow.appendChild(addThirdCell);
    container.appendChild(newRow);
}
// Function to add a document to the table
function addDocumentToTable(doc) {
    const newRow = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = doc.Title;
    newRow.appendChild(idCell);
    const nameCell = document.createElement('td');
    nameCell.textContent = doc.Version;
    newRow.appendChild(nameCell);
    tableBody.appendChild(newRow);
}
function tableDisplayToggle() {
    var _a, _b;
    let isFirstState = true;
    if ((tableTitles === null || tableTitles === void 0 ? void 0 : tableTitles.style.display) === 'none') {
        tableBody.classList.toggle('vertical-layout');
        tableTitles.style.display = 'block';
        console.log((_a = document.getElementById("table-titles")) === null || _a === void 0 ? void 0 : _a.style, 'paso 1');
    }
    else {
        (tableTitles === null || tableTitles === void 0 ? void 0 : tableTitles.style.display) !== null ? (tableTitles === null || tableTitles === void 0 ? void 0 : tableTitles.style.display) === 'none' : '';
        tableBody.classList.toggle('horizontal-layout');
        console.log((_b = document.getElementById("table-titles")) === null || _b === void 0 ? void 0 : _b.style.display, 'paso 2');
    }
    isFirstState = true;
}
function removeChildNodes() {
    while (tableBody === null || tableBody === void 0 ? void 0 : tableBody.firstChild) {
        tableBody.removeChild(tableBody === null || tableBody === void 0 ? void 0 : tableBody.firstChild);
    }
}
function orderTable(documentList) {
    const valueOptionIndex = selectOption.selectedIndex;
    const valueSelect = selectOption.options[valueOptionIndex].value;
    if (documentList && valueSelect !== 'Select one...') {
        if (valueSelect === 'Name') {
            removeChildNodes();
            documentList.sort((a, b) => {
                const result = a.Title.localeCompare(b.Title);
                return result !== 0 ? result : a.Title.localeCompare(b.Title);
            }).forEach(doc => renderDocumentRow(doc));
        }
        if (valueSelect === 'Date') {
            removeChildNodes();
            documentList.sort((a, b) => {
                const dateA = new Date(a.CreatedAt);
                const dateB = new Date(b.CreatedAt);
                return dateA.getTime() - dateB.getTime();
            }).forEach(doc => renderDocumentRow(doc));
        }
        if (valueSelect === 'Size') {
            removeChildNodes();
            documentList.sort((a, b) => {
                return b.Attachments.length - a.Attachments.length === 0
                    ?
                        (b.Attachments.length + b.Attachments.flatMap.length) - (a.Attachments.length + a.Attachments.flatMap.length)
                    : b.Attachments.length - a.Attachments.length;
            }).forEach(doc => renderDocumentRow(doc));
        }
    }
}
// Function to initialize the table with fetched documents
function initializeTable(documentList) {
    return __awaiter(this, void 0, void 0, function* () {
        documentList.forEach(doc => renderDocumentRow(doc));
        setInterval(checkNewDocuments, 3000);
        setInterval(checkUserActivity, 5000);
        firstButtonToggle.addEventListener('click', () => {
            tableTitles.style.display = 'none';
            //tableBody.classList.toggle('horizontal-layout'); 
            //tableDisplayToggle();
        });
        toggleLayoutButton.addEventListener('click', () => {
            tableTitles.style.display = 'table-header-group';
            console.log('paso 1');
            //tableBody.classList.toggle('vertical-layout'); 
            //tableDisplayToggle();
        });
        addButton.addEventListener('click', () => {
            formDiv.style.display = 'flex';
            //formDiv.appendChild(renderAddTableDocsPopup())
        });
        selectOption.addEventListener('click', () => {
            orderTable(documentList);
            //formDiv.style.display = 'flex';
            //formDiv.appendChild(renderAddTableDocsPopup())
        });
        // Populate the table
        // Show the form when the "Add New Document" button is clicked
        // addButton.addEventListener('click', () => {
        //  formDiv.style.display = 'block'; // Show the form
        //});
        // Hide the form when the "Cancel" button is clicked
        cancelButton.addEventListener('click', () => {
            formDiv.style.display = 'none'; // Hide the form
        });
        // Handle form submission for adding a new document
        submitButton.addEventListener('click', () => {
            const documentId = document.getElementById('document-id').value;
            const documentName = document.getElementById('document-name').value;
            if (documentId && documentName) {
                // Add the new document to the array
                //documents.push();
                // Update the table with the new document
                //addDocumentToTable(documentId, documentName);
                // Clear the input fields
                //(document.getElementById('document-id') as HTMLInputElement).value = '';
                //(document.getElementById('document-name') as HTMLInputElement).value = '';
                // Hide the form after submission
                formDiv.style.display = 'none';
            }
            else {
                alert('Please fill in both the Document ID and Name');
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    let documentList = (yield fetchDocuments()) || [];
    console.log(documentList);
    initializeTable(documentList);
}));
// Initialize the document table when the page loads
//window.addEventListener('load', initializeTable());
