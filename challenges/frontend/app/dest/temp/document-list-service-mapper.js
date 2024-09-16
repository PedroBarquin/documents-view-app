export const documentListMapper = (documentList) => {
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
