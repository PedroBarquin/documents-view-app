import { DocumentResponseModel, UserActivity } from "./get-document-list-model";

let container = document.getElementById('document-list-table') as HTMLTableSectionElement;

const userActivityListMapper = (userActivityList: any): UserActivity => {
    return {
        Timestamp: userActivityList.Timestamp,
        UserID: userActivityList.UserID,
        UserName: userActivityList.UserName,
        DocumentID: userActivityList.DocumentID,
        DocumentTitle: userActivityList.DocumentTitle,
    }
  
}
const documentListMapper = (documentList: any[]): DocumentResponseModel[] => {
    
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
      }
  })
}

//let DocumentList: DocumentResponseModel [] = []
// Get references to the DOM elements
const selectOption = document.getElementById('selectOption') as HTMLSelectElement;
const tableTitles = document.getElementById('table-titles') as HTMLHeadElement;
const firstButtonToggle = document.getElementById('default-toggle') as HTMLButtonElement;
const toggleLayoutButton = document.getElementById('second-toggle') as HTMLButtonElement;
const addButton = document.getElementById('add-new-document-button') as HTMLButtonElement;
const formDiv = document.getElementById('add-document-form') as HTMLDivElement;
const submitButton = document.getElementById('submit-document') as HTMLButtonElement;
const cancelButton = document.getElementById('cancel-document') as HTMLButtonElement;
const tableBody = document.getElementById('document-list-table') as HTMLTableSectionElement;
const notificationButton = document.getElementById('notification') as HTMLDivElement;
const notificationNumber = document.getElementById('notification-number') as HTMLElement;
const notificationMessage = document.getElementById('notification-message') as HTMLElement;

let documents: DocumentResponseModel[] = [];
let documentsToAdd: DocumentResponseModel[] = [];
  async function fetchDocuments(): Promise<DocumentResponseModel[] | undefined> {
    try {
        //find endpoint
        const response = await fetch('http://localhost:8080/documents')
        if(!response.ok){
            throw new Error(`HTTP ERROR STATUS ${response.status}`)
        }
        const data = await response.json();
        documents = documentListMapper(data);
        return documents;
    }
    catch(error){
        console.error('Error fetching document list ', error)
    }
  }
  async function checkUserActivity() {
        const socket = new WebSocket('ws://localhost:8080/notifications');
        socket.onopen = () => {
          
          socket.onmessage = (event) => {
            try{
              notificationMessage.innerText = '';
            const data = JSON.parse(event.data);
            const mappedData = userActivityListMapper(data);
            if (mappedData.Timestamp) {
              console.log('New document received from user:', mappedData.UserName);
            }
            notificationButton.style.display = 'absolute'
            notificationNumber.innerText = `${mappedData.Timestamp.getMinutes}`;
            notificationMessage.innerText = `Minutes ago. New document received from user: ${mappedData.UserName}`
            setTimeout(() => {
              notificationButton.style.display = "none";
            }, 3000);
            } catch(err) {
              console.error('Error parsing WebSocket message as JSON:', err);
            }
          };

          socket.send('Connection established from user ')
          
          // Handle errors
          socket.onerror = (error) => {
            console.error('WebSocket error:', error);
          };
          
          // Handle connection close
          socket.onclose = () => {
            console.log('WebSocket connection closed');
          };
        } 
  }
 

  async function checkNewDocuments(): Promise<void> {
    try{
      const previousDocumentTotal = documents.length;
      const newDocumentTotal = await fetchDocuments() || [];
      if(newDocumentTotal?.length > previousDocumentTotal){
        notificationButton.style.display = 'absolute'
        notificationNumber.innerText = `${newDocumentTotal.length - previousDocumentTotal}`
        notificationMessage.innerText = `New document created!`
        setTimeout(() => {
          notificationButton.style.display = "none";
        }, 10000);
        removeChildNodes();
        newDocumentTotal.forEach(doc => renderDocumentRow(doc));
      }
    } catch(error){
      console.error('Error fetching latest document list ', error)
  }
  }
  
  
  function renderDocumentRow(doc: DocumentResponseModel) {
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
    addSecondCell.textContent = doc.Contributors.map(contributor => `${contributor.Name || contributor.ID}`).join(' ')
    newRow.appendChild(addSecondCell);
    addThirdCell.textContent = doc.Attachments.join(', ')
    newRow.appendChild(addThirdCell);

    container.appendChild(newRow);
  }

// Function to add a document to the table
function addDocumentToTable(doc: DocumentResponseModel) {
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
  let isFirstState: boolean = true;
  
  if(tableTitles?.style.display === 'none'){
    tableBody.classList.toggle('vertical-layout'); 
    tableTitles.style.display = 'block';
    console.log( document.getElementById("table-titles")?.style, 'paso 1');
  } else {
    tableTitles?.style.display !== null ? tableTitles?.style.display ===  'none' : '';
   tableBody.classList.toggle('horizontal-layout');
   console.log( document.getElementById("table-titles")?.style.display, 'paso 2');
   
  }
  isFirstState = true;

}

function removeChildNodes() {
  while (tableBody?.firstChild) {
    tableBody.removeChild(tableBody?.firstChild);
  }
}
function orderTable(documentList: DocumentResponseModel[]){
  const valueOptionIndex = selectOption.selectedIndex;
  const valueSelect = selectOption.options[valueOptionIndex].value;

  if(documentList && valueSelect !== 'Select one...'){
    if(valueSelect === 'Name'){
      removeChildNodes()
      documentList.sort((a, b) => {
        const result = a.Title.localeCompare(b.Title);

        return result !== 0 ? result : a.Title.localeCompare(b.Title);
      }

      ).forEach(doc => renderDocumentRow(doc))
    }
    if(valueSelect === 'Date'){
      removeChildNodes()
      documentList.sort((a, b) => {
        const dateA = new Date(a.CreatedAt);
        const dateB = new Date(b.CreatedAt);
        return dateA.getTime() - dateB.getTime();
      }).forEach(doc => renderDocumentRow(doc))
    }
    if(valueSelect === 'Size'){
      removeChildNodes()
      documentList.sort((a, b) => {
        
        return b.Attachments.length - a.Attachments.length === 0 
        ? 
        (b.Attachments.length + b.Attachments.flatMap.length) - (a.Attachments.length + a.Attachments.flatMap.length)
        : b.Attachments.length - a.Attachments.length
      }).forEach(doc => renderDocumentRow(doc))
    }
  }
}
// Function to initialize the table with fetched documents
async function initializeTable(documentList: DocumentResponseModel[]) {
 

  documentList.forEach(doc => renderDocumentRow(doc));
  setInterval(checkNewDocuments, 3000);
  setInterval(checkUserActivity, 5000);
  firstButtonToggle.addEventListener('click', () => {
    tableTitles.style.display = 'none';
    //tableBody.classList.toggle('horizontal-layout'); 
    //tableDisplayToggle();
    
  } )
  toggleLayoutButton.addEventListener('click', () => {
    tableTitles.style.display = 'table-header-group';
    console.log('paso 1')
    //tableBody.classList.toggle('vertical-layout'); 
    //tableDisplayToggle();
  });

  addButton.addEventListener('click', () => {
    formDiv.style.display = 'flex';
    //formDiv.appendChild(renderAddTableDocsPopup())
  })

  selectOption.addEventListener('click', () => {
    orderTable(documentList)
    //formDiv.style.display = 'flex';
    //formDiv.appendChild(renderAddTableDocsPopup())
  })

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
    const documentId = (document.getElementById('document-id') as HTMLInputElement).value;
    const documentName = (document.getElementById('document-name') as HTMLInputElement).value;
  
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
    } else {
      alert('Please fill in both the Document ID and Name');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  
  let documentList: DocumentResponseModel[] = await fetchDocuments() || [];
  console.log(documentList);
  initializeTable(documentList);
  
})