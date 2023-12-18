import { Dispatch, SetStateAction } from 'react'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { formatCSV, readCSVFile } from '@/lib/csv-utils'

export function TransactionFileDrop({
    fileEntries,
}: {
    fileEntries: Dispatch<
        SetStateAction<
            {
                date: string
                amount: string
                description: string
            }[]
        >
    >
}) {
    const handleUpload = async (files: FileList | null) => {
        if (files === null || files.length === 0) {
            return
        }
        const csv = await readCSVFile(files[0])
        if (csv instanceof ArrayBuffer) {
            return
        }
        const entries = formatCSV(csv)
        fileEntries(entries)
    }

    return (
        <>
            <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
            >
                Batch upload from file
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                    <ArrowDownOnSquareIcon
                        className='mx-auto h-12 w-12 text-gray-300'
                        aria-hidden='true'
                    />
                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                        <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                        >
                            <span>Upload a file</span>
                            <input
                                id='file-upload'
                                name='file-upload'
                                type='file'
                                accept='.csv'
                                className='sr-only'
                                onChange={e => handleUpload(e.target.files)}
                            />
                        </label>
                        <p className='pl-1'>or drag and drop a CSV</p>
                    </div>
                </div>
            </div>
        </>
    )
}
