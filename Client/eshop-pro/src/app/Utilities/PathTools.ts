
import { environment } from 'src/environments/environment.prod'



export const  DomainName = environment.production === false ? 'https://webartdesign.ir' : 'https://localhost:44302';
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/';
