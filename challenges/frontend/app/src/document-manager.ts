import { returnDocuments } from "./app";
import { DocumentResponseModel } from "./get-document-list-model";

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
function renderDocumentRow(doc: DocumentResponseModel): string {

  return `
    <tr>
      <td>
        <div class="document-name">${doc.Title}</div>
        <div class="document-version">Version ${doc.Version}</div>
      </td>
      <td>${doc.Contributors.join(', ')}</td>
      <td>${doc.Attachments.join(', ')}</td>
    </tr>
  `;
}

async function getDocumentList(): Promise<DocumentResponseModel[] | undefined> {
  try {
      //find endpoint
      const response = await fetch('http://localhost:8080/documents')
      if(!response.ok){
          throw new Error(`HTTP ERROR STATUS ${response.status}`)
      }
      const data = await response.json();
      return documentListMapper(data);
  }
  catch(error){
      console.error('Error fetching document list ', error)
  }
}

class AddNewDocumentManager {
  public addContainer: HTMLElement;
  public addNewDocumentToDocumentList: DocumentResponseModel[] = [];

  constructor(container: string){
    this.addContainer = document.getElementById(container) as HTMLElement;
    this.renderAddDocument();
    this.addContainer.classList.toggle("show");
}
  private renderAddDocument(): void {
    this.addContainer.innerHTML = `
        <div class="controls">
            <div class="sort">
              <select>
                <option>Select one...</option>
                <option>Name</option>
                <option>Date</option>
                <option>Size</option>
              </select>
            </div>    
          </div>    
          <table class="document-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contributors</th>
                <th>Attachments</th>
              </tr>
            </thead>
            <tbody>
            ${this.addNewDocumentToDocumentList?.map(doc => renderDocumentRow(doc)).join('')}
              <input></input>
            </tbody>
          </table>
          <button class="add-new-document" id="new-to-document">+ Add document/s</button>
          <button class="save-window">Save and close</button>
          <button class="close> Close without saving </button>
        </div>
    `;
  }

}
function showPopup(): void { 
  new AddNewDocumentManager('myPopup');
}
;


class DocumentManager {
  public container: HTMLElement;
  public documentList: DocumentResponseModel[] = [];
    constructor(containerId: string, documentList: DocumentResponseModel[]) {
      this.container = document.getElementById(containerId) as HTMLElement;
      this.documentList = documentList;
      this.render();
    }
  
    private render(): void {
      this.container.innerHTML = `
        <div class="document-manager">
          <div class="header">
            <h1>Documents</h1>
            <div class="notification">
              <span class="notification-icon">🔔</span>
              <span class="notification-badge"></span>
            </div>
          </div>
          <div class="controls">
            <div class="sort">
              <span>Sort by:</span>
              <select>
                <option>Select one...</option>
                <option>Name</option>
                <option>Date</option>
                <option>Size</option>
              </select>
            </div>
            <div class="view-options">
              <button class="view-option active">☰</button>
              <button class="view-option">▦</button>
            </div>
          </div>
          <table class="document-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contributors</th>
                <th>Attachments</th>
              </tr>
            </thead>
            <tbody>
              ${this.documentList?.map(doc => renderDocumentRow(doc)).join('')}
            </tbody>
          </table>
          <button class="myPopup" onclick="showPopup()" id="new-document">+ Add document</button>
        </div>
      `;
    }
  
    
  }
  
  // Usage
  document.addEventListener('DOMContentLoaded', async () => {
    let documentList: DocumentResponseModel[] = await getDocumentList() || [];
    new DocumentManager('app', documentList);
    const addDocumentButton = document.getElementById('add-document-button');
   
  
    /*addDocumentButton?.addEventListener("click", () => {
 
      const addDocumentRendered = new AddNewDocumentManager('add-document', []);
      addDocumentRendered.add('show')
    })*/

  });

