import './App.css';
// import Create from './ui/Create';
// import Update from './ui/Update';
// import List from './ui/List';
// import Delete from './ui/Delete';
// import Create from './Party/Create';
// import Update from './Party/Update'
// import List from './Party/List';
// import Delete from './Party/Delete'
// import Create from './item_info/Create';
import CategoryEnry from './Category/Create'
import CategoryList from './Category/List'
import CategoryUpdate from './Category/Update'
import CateggoryDelete from './Category/Delete'
import ItemEntry from './item_info/Create'
import ItemList from './item_info/List'
import ItemUpdate from './item_info/Update'
import ItemDelete from './item_info/Delete'
import PartyEntry from './Party/Create'
import PartyList from './Party/List'
import PartyUpdate from './Party/Update'
import PartyDelete from './Party/Delete'
import InvoiceList from './grey/List'
import InvoiceEntry from './grey/Create'
import PoutEntry from './pout/Create'
import EntryList from './pout/List'
import PoutDelete from './pout/Delete'
import PoutUpdate from './pout/Update'
import ExpensesEntry from './expenses/Create'
import ExpensesList from './expenses/List'
import UpdateExpenses from './expenses/Update'
import DeleteExpenses from './expenses/Delete'
import TypeEntry from './expense_type/Create'
import TypeList from './expense_type/List'
import UpdateType from './expense_type/Update'
import DeleteType from './expense_type/Delete'
import PinEntry from './pin/Create'
import PinList from './pin/List'
import UpdatePin from './pin/Update'
import DeletePin from './pin/Delete'
import SellEntry from './Sell/Create'
import SellList  from './Sell/List'
import SellUpdate from './Sell/Update'
import SellDelete from './Sell/Delete'


import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <>
    <Routes>
    <Route exact path='/category-entry' element={<CategoryEnry/>} ></Route>
    <Route exact path='/category-list' element={<CategoryList/>} ></Route>
    <Route exact path='/category-list/update/:id' element={<CategoryUpdate/>} ></Route>
    <Route exact path='/category-list/delete/:id' element={<CateggoryDelete/>} ></Route>
    <Route exact path='/item-entry' element={<ItemEntry/>} ></Route>
    <Route exact path='/item-list' element={<ItemList/>} ></Route>
    <Route exact path='/item-list/update/:id' element={<ItemUpdate/>} ></Route>
    <Route exact path='/item-list/delete/:id' element={<ItemDelete/>} ></Route>
    <Route exact path='/party-entry' element={<PartyEntry/>} ></Route>
    <Route exact path='/party-list' element={<PartyList/>} ></Route>
    <Route exact path='/party-list' element={<PartyList/>} ></Route>
    <Route exact path='/party-list/update/:id' element={<PartyUpdate/>} ></Route>
    <Route exact path='/party-list/delete/:id' element={<PartyDelete/>} ></Route>   
    <Route exact path='/invoice-list' element={<InvoiceList/>} ></Route>
      <Route exact path='/invoice-create' element={<InvoiceEntry/>} ></Route>
      {/* <Route exact path='invoice-list/delete/:id' element={<InvoiceDelete/>}></Route> */}
      {/* <Route exact path='/entry' element={<Create/>}></Route> */}
      <Route exact path='/proceed_out/:id' element={<PoutEntry/>}></Route>
      <Route exact path='/list-entries' element={<EntryList/>}></Route>
      <Route exact path='/list-entries/delete/:id' element={<PoutDelete/>}></Route>
      <Route exact path='/list-entries/update/:id' element={<PoutUpdate/>}></Route>


      <Route exact path='/expenses-entry' element={<ExpensesEntry/>}></Route>
      <Route exact path='/expenses-list' element={<ExpensesList/>}></Route>
      <Route exact path='/expenses-update/:id' element={<UpdateExpenses/>}></Route>
      <Route exact path='/expenses-delete/:id' element={<DeleteExpenses/>}></Route>
      <Route exact path='/expenseType-entry' element={<TypeEntry/>}></Route>
      <Route exact path='/expenseType-list' element={<TypeList/>}></Route>
      <Route exact path='/expenseType-update/:id' element={<UpdateType/>}></Route>
      <Route exact path='/expenseType-delete/:id' element={<DeleteType/>}></Route>
      <Route exact path='/proceed_in/:id' element={<PinEntry/>}></Route>

      <Route exact path='/pin-list' element={<PinList/>}></Route>
      <Route exact path='/pin-list/update/:id' element={<UpdatePin/>}></Route>

      <Route exact path='/pin-list/delete/:id' element={<DeletePin/>}></Route>
      <Route exact path='/sell-entry' element={<SellEntry/>}></Route>
      <Route exact path='/sell-list' element={<SellList/>}></Route>
      <Route exact path='/sell-update/:id' element={<SellUpdate/>}></Route>
      <Route exact path='/sell-delete/:id' element={<SellDelete/>}></Route>






    


  


    </Routes>
    </>
  )
}

export default App;
