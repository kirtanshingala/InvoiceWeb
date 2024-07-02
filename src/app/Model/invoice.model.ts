export class Invoice {
    // StartDate?: Date;
    // DueDate?: Date;
    invoiceID?: number;
    // UserID?: number;
    // F_Name!: string;
    // F_MobileNumber!: number;
    // F_MSME_NO!: number;
    // F_GSTIN_UIN!: string;
    // F_PAN_IT!: string;
    // F_Email!: string;
    // F_Address!: string;
    invoiceNumber?: string;
    to_Name?: string;
    
    to_Address!: string;
    item!: string;
    qty!: number;
    price!: number;
    total!: number;
    taxableAmount!: number;
    invoiceDate?: Date | undefined;


    to_MobileNumber: string ='';
    to_MSME_NO: string = '';
    to_GSTIN_UIN: string = '' ;
    to_PAN_IT: string = '';
    to_Email: string = '';
    hsN_SAC: string = '';
    description: string = '';

    cgsT_Per: number = 0 ;
    cgsT_Amount: number = 0;
    sgsT_Per: number = 0 ;
    sgsT_Amount: number = 0;
    tdS_Per: number = 0;
    tdS_Amount: number = 0;
}
