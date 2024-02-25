'use client'

import { useCategories } from '@/contexts/CategoryContext'
import { useDataRules } from '@/contexts/DataRuleContext'
import { DataRuleEditActions } from '../Dropdowns/DataRuleActions'

export function DataRulesTable() {
    const { categories } = useCategories()
    const findCategories: Record<string, { kind: string; category: string }> = {}
    categories.forEach(({ id, kind, category }) => {
        findCategories[id] = { kind, category }
    })

    const { dataRules } = useDataRules()
    const rules = dataRules.map(rule => ({
        ...rule,
        kind: findCategories[rule.category].kind,
        category: findCategories[rule.category].category,
    }))

    return (
        <div className='-mx-4 -my-2 mt-8 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle'>
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                        <tr>
                            <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                            >
                                Title
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Category
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Regex
                            </th>
                            <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'>
                                <span className='sr-only'>Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                        {rules.map(t => (
                            <tr key={t.id}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                    {t.title}
                                </td>
                                <td className='flex items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.category}
                                    <span
                                        className={`${
                                            t.kind === 'Income'
                                                ? 'bg-green-50 text-green-800 ring-green-600/20'
                                                : 'bg-red-50 text-red-800 ring-red-600/20'
                                        }
                                        mx-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset`}
                                    >
                                        {t.kind}
                                    </span>
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.regex}
                                </td>
                                {/* <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <Link
                                        href={`/rules/${t.id}`}
                                        className='text-indigo-600 hover:text-indigo-900'
                                    >
                                        Edit<span className='sr-only'>, {t.title}</span>
                                    </Link>
                                </td> */}
                                <td className='relative flex items-center justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <DataRuleEditActions id={t.id} category={t.category} />
                                    <span className='sr-only'>Edit, {t.title}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
