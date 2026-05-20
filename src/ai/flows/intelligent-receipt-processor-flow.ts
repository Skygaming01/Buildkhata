
'use server';
/**
 * @fileOverview An AI agent for scanning and extracting details from receipts.
 *
 * - intelligentReceiptProcessor - A function that handles the receipt scanning and data extraction process.
 * - IntelligentReceiptProcessorInput - The input type for the intelligentReceiptProcessor function.
 * - IntelligentReceiptProcessorOutput - The return type for the intelligentReceiptProcessor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentReceiptProcessorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IntelligentReceiptProcessorInput = z.infer<
  typeof IntelligentReceiptProcessorInputSchema
>;

const IntelligentReceiptProcessorOutputSchema = z.object({
  vendorName: z.string().describe('The name of the vendor or merchant.'),
  totalAmount: z.number().describe('The total amount of the transaction.'),
  currency: z
    .string()
    .describe('The currency code of the transaction (e.g., INR, USD).'),
  transactionDate: z
    .string()
    .describe('The date of the transaction in YYYY-MM-DD format.'),
  category: z
    .string()
    .describe(
      'A suggested category for the expense (e.g., Materials, Labor, Fuel, Food, Supplies, Office Expenses, Services).'
    ),
  lineItems: z
    .array(
      z.object({
        item: z.string().describe('Name of the item.'),
        quantity: z.number().describe('Quantity of the item.'),
        price: z.number().describe('Unit price of the item.'),
      })
    )
    .optional()
    .describe('An array of individual line items on the receipt.'),
  taxAmount: z
    .number()
    .optional()
    .describe('The total tax amount, if specified.'),
  subtotal: z
    .number()
    .optional()
    .describe('The subtotal amount before taxes and discounts.'),
});
export type IntelligentReceiptProcessorOutput = z.infer<
  typeof IntelligentReceiptProcessorOutputSchema
>;

export async function intelligentReceiptProcessor(
  input: IntelligentReceiptProcessorInput
): Promise<IntelligentReceiptProcessorOutput> {
  return intelligentReceiptProcessorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentReceiptProcessorPrompt',
  input: {schema: IntelligentReceiptProcessorInputSchema},
  output: {schema: IntelligentReceiptProcessorOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert financial assistant tasked with accurately extracting transaction details from a receipt image.

Analyze the provided receipt image and extract the following details:
- The name of the vendor/merchant.
- The total amount of the transaction.
- The currency used (prefer INR/₹ if applicable).
- The date of the transaction in YYYY-MM-DD format. If only month and day are present, assume the current year.
- A suitable category for the expense from the following options: Materials, Labor, Fuel, Food, Supplies, Office Expenses, Services, Utilities, Rent, Travel, Entertainment, Other. Choose the best fit.
- Optionally, extract individual line items including item name, quantity, and unit price.
- Optionally, extract the subtotal and tax amount if clearly specified.

Prioritize accuracy and format the output strictly as a JSON object matching the provided schema.

Receipt Image: {{media url=photoDataUri}}`,
});

const intelligentReceiptProcessorFlow = ai.defineFlow(
  {
    name: 'intelligentReceiptProcessorFlow',
    inputSchema: IntelligentReceiptProcessorInputSchema,
    outputSchema: IntelligentReceiptProcessorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract receipt details.');
    }
    return output;
  }
);
