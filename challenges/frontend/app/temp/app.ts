import { DocumentResponseModel } from "../src/get-document-list-model"

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





function createDocumentElement(doc: DocumentResponseModel): HTMLElement {
    const tBody = document.querySelector("tbody")!;
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

function renderDocuments(docs: DocumentResponseModel[]): void {
    const container = document.getElementById("grid");

    if(container){
        container.innerHTML = '';
        docs.map(doc => {
            return createDocumentElement(doc);
        }).map(doc => container.appendChild(doc))
    }
    else {
        console.error(" No element or docs were found ")
    }
}



export async function returnDocuments(){ 
    try {
	const response = await getDocumentList();
    return response;
    } catch (error){
        console.log("Failed to fetch documents: ", error)
    }
};
    
returnDocuments()