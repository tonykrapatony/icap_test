'use client'
import MainContainer from '@/components/MainContainer'
import Pagination from '@/components/Pagination';
import { useGetTableQuery, useAddToTableMutation, useDeleteDataMutation, useUpdateDataPUTMutation, useUpdateDataPATCHMutation } from '@/redux';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [table, setTable] = useState([]);
    const [count, setCount] = useState(10);
    const [offset, setOffset] = useState(0);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [adressError, setAdressError] = useState('');
    const [addError, setAddError] = useState(false);
    const [updatePutError, setUpdatePutError] = useState(false);
    const [updatePatchError, setUpdatePatchError] = useState(false);
    const [delMsg, setDelMsg] = useState('');
    const [success, setSuccess] = useState('');

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    

    const [addToTable] = useAddToTableMutation();
    const [deleteData] = useDeleteDataMutation();
    const [updateDataPUT] = useUpdateDataPUTMutation();
    const [updateDataPATCH] = useUpdateDataPATCHMutation();

    const { data, isSuccess, isError, refetch } = useGetTableQuery(`?limit=${count}&offset=${offset}`);
    // console.log(data)

    useEffect(() => {
        if (isSuccess) {
            // console.log(data);
            setTable(data.results);
            setTotalItems(data.count);
        } else if (isError) {
            console.error('Помилка при запиті до сервера');
        }
    }, [data, isSuccess, isError]);
    
    const plusHandler = () => {
        if (data.next) {
            const nextParams = new URL(data.next).searchParams;
            setOffset(Number(nextParams.get('offset')));
            refetch(`?limit=${count}&offset=${offset}`);
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageChange = (newPage) => {
        const newOffset = (newPage - 1) * count;
        setOffset(newOffset);
        refetch(`?limit=${count}&offset=${newOffset}`);
        setCurrentPage(newPage);
    }

    const minusHandler = () => {
        if (data.previous) {
            const previousParams = new URL(data.previous).searchParams;
            setOffset(Number(previousParams.get('offset')));
            refetch(`?limit=${count}&offset=${offset}`);
            setCurrentPage(currentPage - 1);
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('id');

        const newData = {
            name: `${formData.get('username')}`,
            email: `${formData.get('email')}`,
            birthday_date: `${formData.get('birthday_date')}`,
            phone_number: `${formData.get('phone_number')}`,
            address: `${formData.get('address')}`,
        }
        const resp = await addToTable(newData);
        if (resp.error) {
            // console.log(resp.error)
            setAddError(!addError);
            setNameError(resp.error.data.name);
            setEmailError(resp.error.data.email);
            setBirthdayError(resp.error.data.birthday_date);
            setPhoneError(resp.error.data.phone_number);
            setAdressError(resp.error.data.address);

        } else {
            setSuccess('Data has been added to the table')
            setTimeout(() => {
                setSuccess('');
            }, 3000);
            setAddError(!addError);
            setNameError('');
            setEmailError('');
            setBirthdayError('');
            setPhoneError('');
            setAdressError('');
        }
    }

    const putUpdateHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('id');
        const newData = {
            name: `${formData.get('username')}`,
            email: `${formData.get('email')}`,
            birthday_date: `${formData.get('birthday_date')}`,
            phone_number: `${formData.get('phone_number')}`,
            address: `${formData.get('address')}`,
        }
        console.log(id)
        console.log(newData)
        const resp = await updateDataPUT({id, newData});
        if (resp.error) {
            // console.log(resp.error)
            setUpdatePutError(true);
            setNameError(resp.error.data.name);
            setEmailError(resp.error.data.email);
            setBirthdayError(resp.error.data.birthday_date);
            setPhoneError(resp.error.data.phone_number);
            setAdressError(resp.error.data.address);
        } else {
            setSuccess('Data has been updated');
            setUpdatePutError(false);
            setTimeout(() => {
                setSuccess('');
                e.target.reset();
            }, 3000);
        }
    }

    const patchUpdateHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('id');
        const newData = {
            name: `${formData.get('username')}`,
            email: `${formData.get('email')}`,
            birthday_date: `${formData.get('birthday_date')}`,
            phone_number: `${formData.get('phone_number')}`,
            address: `${formData.get('address')}`,
        }
        console.log(id)
        console.log(newData)
        const resp = await updateDataPATCH({id, newData});
        if (resp.error) {
            console.log(resp.error)
            setUpdatePatchError(true)
            setUpdatePutError(!updatePutError)
            setNameError(resp.error.data.name);
            setEmailError(resp.error.data.email);
            setBirthdayError(resp.error.data.birthday_date);
            setPhoneError(resp.error.data.phone_number);
            setAdressError(resp.error.data.address);
        } else {
            setSuccess('Data has been updated')
            setUpdatePatchError(false)
            setTimeout(() => {
                setSuccess('');
                e.target.reset();
            }, 3000);
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('id');
        const resp = await deleteData(id);

        if (resp.error) {
            // console.log(resp)
            setDelMsg(resp.error.data.detail);
        } else {
            setSuccess('The data has been deleted');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        }
    }

    return (
        <MainContainer>
            {success && <div className='fixed top-4 left-[15%] w-[70%] bg-white border border-green-700 rounded-sm p-2 text-center'>{success}</div>}

            <div className='w-full max-w-[1400px] pt-[50px] mx-auto'>
                <h1 className='text-2xl text-center'>Data table</h1>
                <div className='w-full flex align-top border-t border-b border-black'>
                    <div className='w-[5%] border-l border-r border-black text-center'>id</div>
                    <div className='w-[20%] border-r border-black text-center'>name</div>
                    <div className='w-[25%] border-r border-black text-center'>email</div>
                    <div className='w-[10%] border-r border-black text-center'>birthday_date</div>
                    <div className='w-[10%] border-r border-black text-center'>phone_number</div>
                    <div className='w-[30%] border-r border-black text-center'>address</div>
                </div>
                {
                    table.length > 0 && table.map(({ id, name, email, birthday_date, phone_number, address }) => (
                        <div key={id}>
                            <div className='w-full flex align-top'>
                                <div className='w-[5%] border-b border-r border-l border-l-stone-500 text-center break-words'>{id}</div>
                                <div className='w-[20%] border-b border-r border-l-stone-500 text-center break-words'>{name}</div>
                                <div className='w-[25%] border-b border-r border-l-stone-500 text-center break-words'>{email}</div>
                                <div className='w-[10%] border-b border-r border-l-stone-500 text-center break-words'>{birthday_date}</div>
                                <div className='w-[10%] border-b border-r border-l-stone-500 text-center break-words '>{phone_number}</div>
                                <div className='w-[30%] border-b border-r border-l-stone-500 text-center break-words'>{address}</div>
                            </div>
                        </div>
                    )) 
                }
                <Pagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={count} onPageChange={handlePageChange}/>
            </div>

            <div className='w-full max-w-[500px] pt-[60px] mx-auto'>
                <h1 className='text-2xl text-center'>Add data to table</h1>
                <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e)}>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="username" placeholder="User name"/>
                    {addError && <div className='w-[100%] text-red-500 text-center'>{nameError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="email" placeholder="Email"/>
                    {addError && <div className='w-[100%] text-red-500 text-center'>{emailError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="birthday_date" placeholder="Birthday"/>
                    {addError && <div className='w-[100%] text-red-500 text-center'>{birthdayError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="phone_number" placeholder='1234567890' onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9+()\-]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    {addError && <div className='w-[100%] text-red-500 text-center'>{phoneError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="address" placeholder='Address'/>
                    {addError && <div className='w-[100%] text-red-500 text-center'>{adressError}</div>}
                    <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Add</button>
                </form>
            </div>

            <div className='w-full max-w-[500px] pt-[60px] mx-auto'>
                <h1 className='text-2xl text-center'>Update data in table by ID(PUT)</h1>
                <form className="flex flex-col items-center" onSubmit={(e) => putUpdateHandler(e)}>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="id" placeholder='ID' required onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="username" placeholder="User name"/>
                    {updatePutError && <div className='w-[100%] text-red-500 text-center'>{nameError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="email" placeholder="Email"/>
                    {updatePutError && <div className='w-[100%] text-red-500 text-center'>{emailError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="birthday_date" placeholder="Birthday"/>
                    {updatePutError && <div className='w-[100%] text-red-500 text-center'>{birthdayError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="phone_number" placeholder='1234567890' onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9+()\-]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    {updatePutError && <div className='w-[100%] text-red-500 text-center'>{phoneError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="address" placeholder='Address'/>
                    {updatePutError && <div className='w-[100%] text-red-500 text-center'>{adressError}</div>}
                    <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Update</button>
                </form>
            </div>

            <div className='w-full max-w-[500px] pt-[60px] mx-auto'>
                <h1 className='text-2xl text-center'>Update data in table by ID(PATCH)</h1>
                <form className="flex flex-col items-center" onSubmit={(e) => patchUpdateHandler(e)}>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="id" placeholder='ID' required onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="username" placeholder="User name"/>
                    {updatePatchError && <div className='w-[100%] text-red-500 text-center'>{nameError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="email" placeholder="Email"/>
                    {updatePatchError && <div className='w-[100%] text-red-500 text-center'>{emailError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="birthday_date" placeholder="Birthday"/>
                    {updatePatchError && <div className='w-[100%] text-red-500 text-center'>{birthdayError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="phone_number" placeholder='1234567890' onChange={(e) => {

                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9+()\-]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    {updatePatchError && <div className='w-[100%] text-red-500 text-center'>{phoneError}</div>}
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="address" placeholder='Address'/>
                    {updatePatchError && <div className='w-[100%] text-red-500 text-center'>{adressError}</div>}
                    <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Update</button>
                </form>
            </div>

            <div className='w-full max-w-[500px] pt-[60px] mx-auto'>
                <h1 className='text-2xl text-center'>Delete data from table by ID</h1>
                <form className="flex flex-col items-center" onSubmit={(e) => deleteHandler(e)}>
                    <input className="w-full border border-black rounded-sm my-[5px] px-2" type="tel" name="id" placeholder='ID' onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                        e.target.value = numericValue;
                    }}/>
                    {delMsg && <div className='w-[100%] text-red-500 text-center'>{delMsg}</div>}
                    <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Delete</button>
                </form>
            </div>

        </MainContainer>
    )
}
