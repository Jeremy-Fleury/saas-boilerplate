```mermaid
erDiagram

        ExampleStatus {
            draft draft
active active
archived archived
        }
    
  "Company" {
    String id "🗝️"
    String name 
    DateTime createdAt 
    DateTime updatedAt 
    }
  

  "Example" {
    String id "🗝️"
    String name 
    String description 
    ExampleStatus status 
    DateTime createdAt 
    DateTime updatedAt 
    }
  
    "Company" o{--}o "Example" : ""
    "Example" o|--|| "ExampleStatus" : "enum:status"
    "Example" o|--|| "Company" : "company"
```
