import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getColors } from '../store/features/color/colorSlice'

export default function Color() {
  const dispatch = useDispatch()
  const color = useSelector((state)=> state.color)

  console.log(color)
  useEffect(()=>{
dispatch(getColors())
  }, [])
  return (
    <div></div>
  )
}
