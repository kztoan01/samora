# Postman API Request Example - Create Product

## Endpoint
```
POST /api/products
```

## Request Configuration

### Method
`POST`

### URL
```
http://localhost:3000/api/products
```
(Replace with your actual domain if deployed)

### Headers
Postman will automatically set `Content-Type: multipart/form-data` when you use form-data body type. You don't need to manually add this header.

---

## Body (form-data)

### Required Fields

| Key | Type | Value | Description |
|-----|------|-------|-------------|
| `name` | Text | `Rượu Sâm Ngọc Linh 500ml` | Product name (required) |

### Optional Basic Fields

| Key | Type | Value | Description |
|-----|------|-------|-------------|
| `description` | Text | `Rượu Sâm Ngọc Linh cao cấp, được chưng cất từ củ sâm tươi` | Product description |
| `category` | Text | `Rượu Sâm Ngọc Linh` | See category options below |
| `stock` | Text | `100` | Stock quantity (number as string) |
| `isAvailable` | Text | `true` | Available status (`true` or `false`) |
| `ingredients` | Text | `Sâm Ngọc Linh, Rượu gạo, Nước tinh khiết` | Ingredients |
| `benefits` | Text | `Tăng cường sức khỏe, bồi bổ cơ thể, tăng cường miễn dịch` | Benefits |
| `usageInstructions` | Text | `Uống 1-2 ly nhỏ mỗi ngày, tốt nhất vào buổi tối` | Usage instructions |
| `storageInstructions` | Text | `Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp` | Storage instructions |

### Category Options
Choose one of these exact values:
- `Các sản phẩm chế biến`
- `Cây giống & Hạt Sâm Ngọc Linh`
- `Rượu Hoa Sâm Ngọc Linh`
- `Rượu Hồng Đào Sâm Ngọc Linh`
- `Rượu Lá Sâm Ngọc Linh`
- `Rượu Sâm Ngọc Linh`
- `Rượu Sâm Ngọc Linh Cây Và Củ`
- `Sâm Ngọc Linh củ tươi`

### Pricing Options

#### Option 1: Simple Price (Single Price)
| Key | Type | Value |
|-----|------|-------|
| `price` | Text | `500000` |

#### Option 2: Volume-Based Pricing (Multiple Prices)
| Key | Type | Value | Description |
|-----|------|-------|-------------|
| `volumeCount` | Text | `3` | Number of volume/price combinations |
| `volume0` | Text | `250ml` | First volume option |
| `originalPrice0` | Text | `250000` | Price for first volume |
| `volume1` | Text | `500ml` | Second volume option |
| `originalPrice1` | Text | `450000` | Price for second volume |
| `volume2` | Text | `1000ml` | Third volume option |
| `originalPrice2` | Text | `800000` | Price for third volume |

**Note:** If using volume pricing, set `volumeCount` to the number of volume/price pairs, then add `volume0`, `originalPrice0`, `volume1`, `originalPrice1`, etc.

### Images
| Key | Type | Value | Description |
|-----|------|-------|-------------|
| `images` | File | [Select file] | Product image (max 5MB per file) |
| `images` | File | [Select file] | Additional image (can add multiple) |

**Note:** 
- You can add multiple images by adding multiple `images` fields
- Each file must be under 5MB
- Files will be uploaded to S3 automatically

---

## Example Request (Simple Price)

### Form-Data Fields:
```
name: Rượu Sâm Ngọc Linh 500ml
description: Rượu Sâm Ngọc Linh cao cấp, được chưng cất từ củ sâm tươi
category: Rượu Sâm Ngọc Linh
stock: 100
isAvailable: true
ingredients: Sâm Ngọc Linh, Rượu gạo, Nước tinh khiết
benefits: Tăng cường sức khỏe, bồi bổ cơ thể, tăng cường miễn dịch
usageInstructions: Uống 1-2 ly nhỏ mỗi ngày, tốt nhất vào buổi tối
storageInstructions: Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp
price: 500000
images: [file1.jpg]
images: [file2.jpg]
```

---

## Example Request (Volume-Based Pricing)

### Form-Data Fields:
```
name: Rượu Sâm Ngọc Linh Đặc Biệt
description: Rượu Sâm Ngọc Linh cao cấp với nhiều dung tích
category: Rượu Sâm Ngọc Linh
stock: 50
isAvailable: true
ingredients: Sâm Ngọc Linh, Rượu gạo, Nước tinh khiết
benefits: Tăng cường sức khỏe, bồi bổ cơ thể
usageInstructions: Uống 1-2 ly nhỏ mỗi ngày
storageInstructions: Bảo quản nơi khô ráo, thoáng mát
volumeCount: 3
volume0: 250ml
originalPrice0: 250000
volume1: 500ml
originalPrice1: 450000
volume2: 1000ml
originalPrice2: 800000
images: [file1.jpg]
```

---

## Postman Setup Instructions

1. **Create New Request**
   - Method: `POST`
   - URL: `http://localhost:3000/api/products` (or your domain)

2. **Set Body Type**
   - Go to "Body" tab
   - Select "form-data" (NOT x-www-form-urlencoded)

3. **Add Fields**
   - For text fields: Select "Text" type, add key and value
   - For files: Select "File" type, add key `images`, click "Select Files"

4. **Add All Required Fields**
   - At minimum: `name` (required)
   - Add other fields as needed

5. **Send Request**
   - Click "Send"
   - Check response for success/error

---

## Expected Success Response

```json
{
  "success": true,
  "id": "507f1f77bcf86cd799439011",
  "slug": "ruou-sam-ngoc-linh-500ml",
  "imageUrls": [
    "https://your-bucket.s3.amazonaws.com/sam-ngoc-linh/product-images/uuid1.jpg",
    "https://your-bucket.s3.amazonaws.com/sam-ngoc-linh/product-images/uuid2.jpg"
  ],
  "message": "Product created successfully with images"
}
```

---

## Error Responses

### Missing Name
```json
{
  "error": "Product name is required"
}
```
Status: 400

### File Too Large
```json
{
  "error": "File image.jpg exceeds 5MB limit."
}
```
Status: 400

### Server Error
```json
{
  "error": "Product creation failed",
  "details": "Error message here"
}
```
Status: 500

---

## Notes

- The `slug` is automatically generated from the product name
- Images are uploaded to AWS S3
- If `volumeCount` is provided and > 0, the system uses volume pricing; otherwise, it uses the simple `price` field
- All numeric fields (stock, price, volumeCount, originalPrice) should be sent as strings in form-data
- Boolean field `isAvailable` should be the string `"true"` or `"false"`

