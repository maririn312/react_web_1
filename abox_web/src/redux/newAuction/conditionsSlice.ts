import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RESPONSE_SUCCESS } from "../../app/appConst";
import { RootState } from "../../app/store";
import { addCondition, removeCondition, switchCondition } from "../../service/auctionApiClient";
import ErrorManager from "../../utility/ErrorManager";

export interface ConditionType {
  id: number,
  value: string,
  label: string,
}

export interface ConditionState {
  isLoading: boolean,
  conditions: ConditionType[],
  error?: string,
}

const initialState: ConditionState = {
  isLoading: false,
  conditions: [],
}

/* ============================================================================ */
/* ============================================================================ */
export const addConditionEvent = createAsyncThunk(
  'newAuction/addCondition',
  async ({auctionId, label, value}:{auctionId:number, label:string, value:string}) => {
    try {
      const response = await addCondition({
        auction_id: auctionId,
        value: value,
        name: label,
      });
      if(response.status === RESPONSE_SUCCESS) {
        return response;
      } else {
        return response.msg;
      }
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
)

/* ============================================================================ */
/* ============================================================================ */
export const removeConditionEvent = createAsyncThunk(
  'newAuction/removeCondition',
  async ({auctionId, conditionId}:{auctionId:number, conditionId:number}) => {
    try {
      const response = await removeCondition(auctionId, conditionId);
      if(response.status === RESPONSE_SUCCESS) {
        return conditionId;
      } else {
        return response.msg;
      }
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
)

/* ============================================================================ */
/* ============================================================================ */
export const switchConditionEvent = createAsyncThunk(
  'newAuction/switchCondition',
  async ({auctionId, first, second}:{auctionId:number, first:number, second:number}) => {
    try {
      const response = await switchCondition(auctionId, first, second);
      if(response.status === RESPONSE_SUCCESS) {
        return true;
      } else {
        return response.msg;
      }
    } catch(ex) {
      return ErrorManager.handleRequestError(ex);
    }
  }
)

/* ============================================================================ */
/* ============================================================================ */
export const conditionsSlice = createSlice({
  name: 'condition',
  initialState,
  reducers: {
    resetConditions: (state, action) => {
      state.conditions = [];
      state.isLoading = false;
      state.error = '';
    },
    insertCondition: (state, action) => {
      const tmp = action.payload as {
        id:number,
        value:string,
        label:string,
      };

      state.conditions.push({
        id: tmp.id,
        value: tmp.value,
        label: tmp.label,
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // ====================================================== //
      .addCase(addConditionEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addConditionEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload !== undefined) {
          if(typeof action.payload === 'string') {
            state.error = action.payload;
          } else {
            state.conditions.push({
              id:action.payload.id, 
              value: action.payload?.value, 
              label: action.payload?.name 
            });
          }
        }
      })
      .addCase(addConditionEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.message} (${action.error.code})`;
      })
      // ====================================================== //
      .addCase(removeConditionEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeConditionEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload !== undefined) {
          if(typeof action.payload === 'string') {
            state.error = action.payload;
          } else {
            state.conditions = state.conditions.filter(item => item.id !== action.payload);
          }
        }
      })
      .addCase(removeConditionEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.message} (${action.error.code})`;
      })
      // ====================================================== //
      .addCase(switchConditionEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(switchConditionEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload !== undefined) {
          if(typeof action.payload === 'string') {
            state.error = action.payload;
          } else {
            // TODO: switch impl
          }
        }
      })
      .addCase(switchConditionEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.message} (${action.error.code})`;
      })
  }
});

/* ============================================================================ */
/* ============================================================================ */
export const conditionState = (state: RootState) => state.conditions;
export const { resetConditions, insertCondition } = conditionsSlice.actions; 
export default conditionsSlice.reducer;