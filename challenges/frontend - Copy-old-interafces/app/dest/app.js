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
function createDocumentElement(doc) {
    const tBody = document.querySelector("tbody");
    const tableRow = document.createElement("tr");
    const documentName = document.createElement("td");
    const documentAttachments = document.createElement("td");
    const documentContributors = document.createElement("td");
    documentName.innerHTML = doc.Title;
    documentAttachments.innerHTML = doc.Attachments[0];
    documentContributors.innerHTML = doc.Contributors[0].Name;
    tableRow.append(documentName);
    tableRow.append(documentAttachments);
    tableRow.append(documentContributors);
    tBody.prepend(tBody);
    return tBody;
}
function renderDocuments(docs) {
    const container = document.getElementById("grid");
    if (container) {
        container.innerHTML = '';
        docs.map(doc => {
            return createDocumentElement(doc);
        }).map(doc => container.appendChild(doc));
    }
    else {
        console.error(" No element or docs were found ");
    }
}
export function returnDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield getDocumentList();
            return response;
        }
        catch (error) {
            console.log("Failed to fetch documents: ", error);
        }
    });
}
;
/** @type {*}
const appHTMLElements = {
    $: {
        menu: document.querySelector('[data-id="document-container"]'),
        menuItems: document.querySelector('[data-id=".grid"]'),
        firstBtn: document.querySelector('[data-id="first-button"]'),
        secondBtn: document.querySelector('[data-id="second-button"]'),
    },
    init() {
        appHTMLElements.$.menu.addEventListener("click", (event) => {
            appHTMLElements.$.menuItems.classList.toggle("hidden");
        });
        appHTMLElements.$.firstBtn.addEventListener("click", (event) => {
            appHTMLElements.$.menuItems.classList.toggle("hidden");
        });
        appHTMLElements.$.secondBtn.addEventListener("click", (event) => {
            appHTMLElements.$.menuItems.classList.toggle("hidden");
        });
    }
    //window.addEventListener("load", appHTMLElements.init);
    }  */
returnDocuments();
