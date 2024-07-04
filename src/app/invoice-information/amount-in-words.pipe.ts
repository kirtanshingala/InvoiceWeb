import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "amountInWords"
})
export class AmountInWordsPipe implements PipeTransform {
    private a: string[] = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    private b: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Five', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    transform(value: string): string {
        if (isNaN(parseFloat(value)) || !isFinite(parseFloat(value))) return 'Not a valid number';
        
        let amount = parseFloat(value).toFixed(2); // ensure always two decimal places
        let amountParts = amount.split('.');
        
        let integerPart = parseInt(amountParts[0]);
        let decimalPart = parseInt(amountParts[1]);

        if (integerPart.toString().length > 9) return 'overflow';

        let str = this.convertToWords(integerPart);
        str += ' Rupees ';
        
        if (decimalPart > 0) {
            str += 'and ' + this.convertToWords(decimalPart) + ' Paisa';
        }
        
        return str + ' Only';
    }

    private convertToWords(num: number): string {
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        
        let str = '';
        str += (Number(n[1]) != 0) ? (this.a[Number(n[1])] || this.b[Number(n[1][0])] + ' ' + this.a[Number(n[1][1])]) + 'Crore ' : '';
        str += (Number(n[2]) != 0) ? (this.a[Number(n[2])] || this.b[Number(n[2][0])] + ' ' + this.a[Number(n[2][1])]) + 'Lakh ' : '';
        str += (Number(n[3]) != 0) ? (this.a[Number(n[3])] || this.b[Number(n[3][0])] + ' ' + this.a[Number(n[3][1])]) + 'Thousand ' : '';
        str += (Number(n[4]) != 0) ? (this.a[Number(n[4])] || this.b[Number(n[4][0])] + ' ' + this.a[Number(n[4][1])]) + 'Hundred ' : '';
        str += (Number(n[5]) != 0) ? (this.a[Number(n[5])] || this.b[Number(n[5][0])] + ' ' + this.a[Number(n[5][1])]) : '';
        // str += ' Only';
        return str.trim();
    }
}
