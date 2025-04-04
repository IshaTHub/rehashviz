import {clsx, ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); 
}

export function formatFileNameAsTitle(fileName: string):

string {   // Remove file extension and replace special characters with spaces

const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

const withSpaces = withoutExtension

.replace(/[-_]+/g, ' ') // Replace dashes andunderscores with spaces

.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase


// Convert to title case (capitalize first letter of each word)

return withSpaces
.split('')
.map((word) => word.charAt(0).toUpperCase() + word.

slice(1).toLowerCase())

.join(' ')
.trim();

}

