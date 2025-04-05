export interface Expense {
    expenseId: number;
    description: string;
    amount: number;
    category: string;
    upload: string; // File name instead of byte array
    date: Date; // Keeping as Date type for easier handling
    filename: string;
    
    // Embedding user details inside userdata
    userdata: {
      userid: number;
      firstname: string;
      lastname: string;
    };
  }
  