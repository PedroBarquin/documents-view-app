var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
function renderDocumentRow(doc) {
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
function getDocumentList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //find endpoint
            const response = yield fetch('http://localhost:8080/documents');
            if (!response.ok) {
                throw new Error(`HTTP ERROR STATUS ${response.status}`);
            }
            const data = yield response.json();
            return documentListMapper(data);
        }
        catch (error) {
            console.error('Error fetching document list ', error);
        }
    });
}
class AddNewDocumentManager {
    constructor(container) {
        this.addNewDocumentToDocumentList = [];
        this.addContainer = document.getElementById(container);
        this.renderAddDocument();
        this.addContainer.classList.toggle("show");
    }
    renderAddDocument() {
        var _a;
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
            ${(_a = this.addNewDocumentToDocumentList) === null || _a === void 0 ? void 0 : _a.map(doc => renderDocumentRow(doc)).join('')}
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
function showPopup() {
    new AddNewDocumentManager('myPopup');
}
;
class DocumentManager {
    constructor(containerId, documentList) {
        this.documentList = [];
        this.container = document.getElementById(containerId);
        this.documentList = documentList;
        this.render();
    }
    render() {
        var _a;
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
              ${(_a = this.documentList) === null || _a === void 0 ? void 0 : _a.map(doc => renderDocumentRow(doc)).join('')}
            </tbody>
          </table>
          <button class="myPopup" onclick="showPopup()" id="new-document">+ Add document</button>
        </div>
      `;
    }
}
// Usage
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    let documentList = (yield getDocumentList()) || [];
    new DocumentManager('app', documentList);
    const addDocumentButton = document.getElementById('add-document-button');
    /*addDocumentButton?.addEventListener("click", () => {
 
      const addDocumentRendered = new AddNewDocumentManager('add-document', []);
      addDocumentRendered.add('show')
    })*/
}));
