import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSportSchools } from "../../../services/SportSchoolService"

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ]

const sportSchoolsSlice = createSlice({
  name: 'sport_schools',
  initialState,
  reducers: {}
})

export const fetchSportSchools = createAsyncThunk('sportSchools/fetchSportSchools', async () => {
    const response = await getSportSchools()
    return response
  })

export default sportSchoolsSlice.reducer