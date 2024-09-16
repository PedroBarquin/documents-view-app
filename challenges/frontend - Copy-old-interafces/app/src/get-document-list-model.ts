export interface User {
    ID: string;
    Name: string
}
export interface DocumentResponseModel {
    ID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    Title: string;
    Attachments: string[];
    Contributors: User[];
    Version: string;
}