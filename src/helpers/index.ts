import { VariantItem, VariantProduct } from "@/redux/slices/shop-new-product.slice";
import CryptoJS from "crypto-js";

export const combineVariants = (variants: VariantItem[]): VariantProduct[] => {
  const init: { name: string, value: string }[][] = [[]]
  const a = variants.map(item => ({ name: item.name, values: [...item.values.filter(i => i.value).map(i => i.value)] }));

  const b = a.reduce((acc, curr) => {
    const result: { name: string, value: string }[][] = [];
    acc.forEach(a => {
      curr.values.forEach(v => {
        result.push([...a, { name: curr.name, value: v }])
      })
    })
    return result;
  }, init);

  return b.map(item => {
    let c = '';
    if (item[0].name === variants[0].name) {
      let i = variants[0].values.find(it => it.value === item[0].value);
      if (i) c = i.image;
    }
    return {
      price: 0,
      inStock: 0,
      sku: '',
      image: c,
      variants: item
    }
  })
};

const secretKey = "your_secret_key";

type EncodeData = number[]

export function encodeData(data: any): string {
  // Chuyển đổi chuỗi thành WordArray và mã hóa bằng AES với mật khẩu
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encrypted;
}

// Giải mã dữ liệu với UTF-8
export function decodeData(encryptedData: string): string {
  // Giải mã dữ liệu
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  // Chuyển kết quả giải mã thành chuỗi UTF-8
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
