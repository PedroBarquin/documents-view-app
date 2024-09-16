import { DocumentResponseModel } from "./get-document-list-model";

export const documentListMapper = (documentList: any[]): DocumentResponseModel[] => {
    
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