/* interface Document {
  name: string;
  version: string;
  contributors: string[];
  attachments: string[];
}

const documents: Document[] = [
  {
    name: "Ruination IPA",
    version: "3.17.9",
    contributors: ["Lue Considine", "Vinnie Welch", "Asa Brekke", "Kailyn Balistreri"],
    attachments: ["Light Lager", "Light Hybrid Beer", "Belgian And French Ale", "Light Hybrid Beer"],
  },
  {
    name: "Sierra Nevada Bigfoot Barleywine Style Ale",
    version: "3.1.19",
    contributors: ["Enos Jast", "Kyla Schmeler", "Eladio Leffler"],
    attachments: ["English Pale Ale", "Vegetable Beer"],
  },
  {
    name: "Bourbon County Stout",
    version: "1.9.9",
    contributors: ["Cody Tremblay", "Richmond Ebert", "Wilfrid Ritchie", "Elton Connelly"],
    attachments: ["Belgian And French Ale", "Sour Ale"],
  },
];

class DocumentManager {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
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
            ${documents.map(doc => this.renderDocumentRow(doc)).join('')}
          </tbody>
        </table>
        <button class="add-document">+ Add document</button>
      </div>
    `;
  }

  private renderDocumentRow(doc: Document): string {
    return `
      <tr>
        <td>
          <div class="document-name">${doc.name}</div>
          <div class="document-version">Version ${doc.version}</div>
        </td>
        <td>${doc.contributors.join(', ')}</td>
        <td>${doc.attachments.join(', ')}</td>
      </tr>
    `;
  }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  new DocumentManager('app');
}); */