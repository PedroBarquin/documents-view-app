async function getDocumentList() {
    try {
        //find endpoint
        const response = await fetch('http://localhost:8080/documents')
        if(!response.ok){
            throw new Error(`HTTP ERROR STATUS ${response.status}`)
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching document list ', error)
    }
}

export async function returnDocuments() { 
	const response = await getDocumentList();
	console.log(response);
};
