import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// Định nghĩa schema validation với Zod
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.coerce.number(),
});

// Khởi tạo state
interface FormState {
  name: string;
  age: number | undefined;
  errors: Record<string, string>;
}

const initialState: FormState = {
  name: 'khag',
  age: undefined,
  errors: {},
};

// Tạo slice cho form với reducer để validate bằng Zod
const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    // Action để update form
    updateForm(state, action: PayloadAction<{ name: string; age: number }>) {
      const result = formSchema.safeParse(action.payload);

      if (!result.success) {
        // Nếu validate không thành công, lưu lỗi vào state
        state.errors = result.error.errors.reduce((acc, error) => {
          if (error.path[0]) {
            acc[error.path[0] as string] = error.message;
          }
          return acc;
        }, {} as Record<string, string>);
      } else {
        // Nếu thành công, cập nhật giá trị và xóa lỗi
        state.name = action.payload.name;
        state.age = action.payload.age;
        state.errors = {};
      }
    },
  },
});

// Xuất action và reducer
export const { updateForm } = testFormSlice.actions;
export default testFormSlice.reducer;