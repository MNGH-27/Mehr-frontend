'use client'

import { memo, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Highcharts from 'highcharts/highmaps'
import highchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact, { type HighchartsReactRefObject } from 'highcharts-react-official'

import { LoadingBoundary } from '@partials/boundaries/Loading'

import { type TShakhesColorItemType } from '@core/types/api/report.type'
import { type TCriticalAny } from '@core/types/type-any'

import { generateDataClasses } from './resources'

interface ClusterMapChartProps {
    colors?: string[]
    data: TShakhesColorItemType[]
    typeReportComplete?: string
    pageName?: string
    sectionName?: string
    filterValues?: TCriticalAny
    selectCityHandler: (province: TCriticalAny, city: TCriticalAny) => void
    withDrilldown?: boolean
}

const ClusterMapChart = ({
    data,
    pageName = '',
    sectionName = '',
    filterValues,
    selectCityHandler,
    withDrilldown = true
}: ClusterMapChartProps) => {
    const chartRef = useRef<HighchartsReactRefObject>(null)

    //* export file name
    const fileName = `${pageName} - ${sectionName}`

    //* Find the minimum and maximum count values
    const minTotalCount = Math.min(...data.map((item) => item.shakesValue))
    const maxTotalCount = Math.max(...data.map((item) => item.shakesValue))

    const [chartState, setChartState] = useState<'province' | 'city'>('province')
    const [provincesGeojson, setProvincesGeojson] = useState({})
    const [citiesGeojson, setCitiesGeojson] = useState({})
    const [citiesLoading, setCitiesLoading] = useState(true)
    const [provinceLoading, setProvinceLoading] = useState(true)

    if (typeof Highcharts === 'object') {
        highchartsDrilldown(Highcharts)
        HighchartsExporting(Highcharts)
        HighchartsOfflineExporting(Highcharts)
        Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: 'var(--font-iran-yekan)'
                }
            },
            lang: {
                thousandsSep: ','
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [provinceResponse, cityResponse] = await axios.all([
                    axios.get('/geojson/province.json'),
                    axios.get('/geojson/cities.json')
                ])

                setProvincesGeojson(provinceResponse.data)
                setCitiesGeojson(cityResponse.data)
                setCitiesLoading(false)
                setProvinceLoading(false)
            } catch {
                setCitiesLoading(false)
                setProvinceLoading(false)
            }
        }

        fetchData()
    }, [withDrilldown])

    if (citiesLoading || provinceLoading) {
        return <LoadingBoundary />
    }

    const provinceJsonData = Highcharts.geojson(provincesGeojson)
    const citiesJsonData = Highcharts.geojson(citiesGeojson)

    let clickCount = 0

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let clickTimer

    const provinceDrilldownFn = async function (e: TCriticalAny) {
        clickCount++

        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0
            }, 250)
        } else if (clickCount === 2) {
            const chart = chartRef?.current?.chart

            const provinceId = e.point.properties['OBJECTID_1']
            const province = data.find((province) => +province.frontId === provinceId)
            const availableCities = citiesJsonData.filter((city) => city.properties.provinceId === provinceId)

            chart?.showLoading(`...در حال دریافت اطلاعات`)

            if (withDrilldown) {
                citiesJsonData.forEach((singleCity: TCriticalAny) => {
                    const cityCode = singleCity.properties['OBJECTID_1']
                    let availableCity: TCriticalAny = []

                    if (province?.frontId === 2) {
                        const otherSectionOfTehran = data.find((province) => +province.id === 12)
                        if (province?.subs.find((city) => +city.frontId === +cityCode) == undefined) {
                            availableCity = otherSectionOfTehran?.subs.find((city) => +city.frontId === +cityCode)
                        } else {
                            availableCity = province?.subs.find((city) => +city.frontId === +cityCode)
                        }
                    } else {
                        availableCity = province?.subs.find((city) => +city.frontId === +cityCode)
                    }

                    singleCity.provinceData = province
                    singleCity.availableCity = availableCity

                    // // add click event to send data to parent component
                    // singleCity.events = {
                    //     click: function () {
                    //         console.log('click')
                    //         selectCityHandler(this.provinceData, this.availableCity)
                    //     }
                    // }

                    if (availableCity) {
                        singleCity.value = availableCity.shakesValue
                        singleCity.tooltipData = availableCity
                        singleCity.name = availableCity.name
                    } else {
                        singleCity.value = 0
                        singleCity.tooltipData = {}
                        singleCity.name = ''
                    }
                })

                const minCount = Math.min(...(province?.subs.map((item) => item.shakesValue) ?? []))
                const maxCount = Math.max(...(province?.subs.map((item) => item.shakesValue) ?? []))

                chart?.update({
                    colorAxis: {
                        dataClasses: generateDataClasses({
                            minNum: minCount,
                            maxNum: maxCount,
                            steps: 10
                        })
                    }
                })

                chart?.addSeriesAsDrilldown(e.point, {
                    type: 'map',
                    name: 'City Details',
                    data: availableCities,

                    states: {
                        hover: {
                            borderColor: 'black',
                            shadow: false
                        }
                    },

                    dataLabels: {
                        enabled: true,
                        formatter: function (): string {
                            return (this as TCriticalAny).point.name
                        },
                        style: {
                            textOutline: '1px #000',
                            fontSize: '12px',
                            color: '#fff'
                        }
                    },
                    point: {
                        events: {
                            click: function (event: TCriticalAny) {
                                console.log('click city chart')
                                if (event.preventDefault) event.preventDefault()
                                if (event.stopPropagation) event.stopPropagation()

                                event.cancelBubble = true

                                selectCityHandler(
                                    (this as TCriticalAny).provinceData,
                                    (this as TCriticalAny).availableCity
                                )
                                return false
                            }
                        }
                    }
                })

                setChartState('city')

                chart?.hideLoading()
            }
        }
    }

    const drillUpFn = () => {
        const chart = chartRef?.current?.chart

        chart?.update(
            {
                colorAxis: {
                    dataClasses: generateDataClasses({
                        minNum: minTotalCount,
                        maxNum: maxTotalCount,
                        steps: 10
                    })
                }
            },
            true,
            true
        )

        setChartState('province')
    }

    // set province Data & set pointers Drilldown
    if (filterValues && filterValues.zone_type === '1' && chartState === 'province') {
        provinceJsonData.forEach((singleProvince: TCriticalAny) => {
            if (withDrilldown) singleProvince.drilldown = singleProvince.properties['OBJECTID_1']
            const provinceCode = singleProvince.properties['OBJECTID_1']
            const availableProvince = data.find((province: TCriticalAny) => +province.frontId === provinceCode)

            singleProvince.value = availableProvince ? availableProvince.shakesValue : 0
        })
    }

    const options = {
        chart: {
            spacing: [50, 0, 0, 0],
            // set drilldown event after clicked on province
            events: {
                drilldown: (e: TCriticalAny) => {
                    return withDrilldown && provinceDrilldownFn(e)
                },
                drillup: withDrilldown && drillUpFn
            },
            animation: false
        },

        title: {
            text: ''
        },

        // custom legend
        colorAxis: {
            dataClasses: generateDataClasses({
                minNum: minTotalCount,
                maxNum: maxTotalCount,
                steps: 10
            })
        },

        exporting: {
            enabled: true,
            sourceWidth: 1440,
            sourceHeight: 1080,
            accessibility: {
                enabled: true
            },
            filename: fileName,
            chartOptions: {
                title: {
                    text: fileName,
                    style: {
                        fontFamily: 'tahoma',
                        fontWeight: '700',
                        fontSize: '20px'
                    }
                },
                legend: {
                    rtl: true,
                    verticalAlign: 'top',
                    align: 'right',
                    y: 10,
                    itemStyle: {
                        fontFamily: 'tahoma',
                        fontSize: '15px'
                    },
                    labelFormatter: function (): string {
                        const formattedText = (this as TCriticalAny).name
                            .toString()
                            .replaceAll(',', '')
                            .replace(/[0-9]+/g, function (match: string) {
                                return parseInt(match).toLocaleString('fa')
                            })
                        return `<span>${formattedText}</span>`
                    }
                }
            },
            allowHTML: true,
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'printChart', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
                    symbol: ``,
                    x: 0,
                    y: -30,
                    text: '<span class="font-semibold text-general-brand bg-general-brandBackground p-2.5 rounded-lg border border-general-brand">خروجی نمودار</span>',
                    align: 'left',
                    useHTML: true
                }
            }
        },

        lang: {
            downloadJPEG: 'JPEG دانلود فایل',
            downloadPNG: 'PNG دانلود فایل',
            downloadSVG: 'SVG دانلود فایل',
            downloadPDF: 'PDF دانلود فایل',
            printChart: 'چاپ نمودار',
            viewFullscreen: 'نمایش تمام صفحه',
            exitFullscreen: 'خروج از نمایش تمام صفحه',
            thousandsSep: ','
        },

        credits: {
            enabled: false
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoom: false,

            buttonOptions: {
                align: 'right',
                verticalAlign: 'top',
                x: -10
            }
        },

        plotOptions: {
            map: {
                nullColor: '#bababa',
                borderColor: '#ffffff',
                states: {
                    // when hover active
                    hover: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },

                    // when hover inactive
                    inactive: {
                        opacity: 1,
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            }
        },

        series: [
            {
                name: 'ایران',
                data: provinceJsonData.map((item: TCriticalAny) => {
                    const provinceCode = item.properties['OBJECTID_1']
                    const availableProvince = data.find((province: TCriticalAny) => +province.frontId === provinceCode)

                    return {
                        ...item,
                        value: availableProvince?.shakesValue ?? 0,
                        tooltipData: availableProvince,
                        drilldown: true,
                        name: availableProvince?.name ?? ''
                    }
                }),

                // Set Hover Style
                states: {
                    hover: {
                        borderColor: 'black',
                        shadow: false
                    }
                },

                // Show/Style Name of the Province
                dataLabels: {
                    enabled: true,
                    formatter: function (): string {
                        return (this as TCriticalAny).point.name // Access the name of the data point
                    },
                    style: {
                        textOutline: '1px #000',
                        fontSize: '12px'
                    }
                }
            }
        ],

        tooltip: {
            shadow: false,
            borderWidth: 0,
            padding: 0,
            useHTML: true,
            borderColor: 'transparent',
            formatter: function (): string {
                return `
                    <div class="bg-white min-w-32 p-2 border border-gray-200 flex flex-col rounded text-right text-xs">
                        <div class="font-semibold text-gray-700">
                          گزارش <span class="text-black font-bold">${(this as TCriticalAny).point.tooltipData.name}</span>
                        </div>
                        
                        <hr class="my-2" />
                        
                        <div class="text-gray-500">
                            <div class="flex flex-row-reverse items-start justify-start gap-x-2">
                                <span class="text-black">شاخص تراکم : ${(this as TCriticalAny).point.tooltipData.shakesValue}</span> 
                            </div>

                        </div>
                    </div>
                `
            }
        },

        drilldown: {
            // style name
            activeDataLabelStyle: {
                color: '#ffffff',
                fontSize: '12px',
                textDecoration: 'none',
                textOutline: '1px #000'
            },
            breadcrumbs: {
                useHTML: true,
                rtl: true,
                buttonTheme: {
                    style: {
                        fontSize: '14px',
                        color: '#000'
                    }
                },
                formatter: function (e: TCriticalAny): string {
                    if (e.level === 0) {
                        return ` <p>${e.levelOptions.name}</p>`
                    } else {
                        return ` <p class="font-bold">${e.levelOptions.name}</p>`
                    }
                },
                separator: {
                    style: {
                        width: 40,
                        textAlign: 'left'
                    }
                }
            }
        },

        legend: {
            rtl: true,
            verticalAlign: 'top',
            align: 'right',
            y: 10
        },

        accessibility: {
            enabled: false
        }
    }

    return (
        <div className='grid h-full mx-16'>
            <HighchartsReact ref={chartRef} constructorType='mapChart' highcharts={Highcharts} options={options} />
        </div>
    )
}

export default memo(ClusterMapChart)
