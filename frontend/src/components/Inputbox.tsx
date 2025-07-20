import { ChangeEvent } from "react";

interface InputBoxProps {
    label: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    placeholder: string;
}


export const InputBox = (props:InputBoxProps)=>{
    return (<div>
        <label className="block mb-2 text-lg font-bold pt-4 text-orange-500">{props.label}</label>
        <input onChange={props.onChange} type={props.type} placeholder={props.placeholder} className="w-full border-2 border-black-300 pt-1.5 pb-1.5 pl-1.5 text-gray-900  rounded-lg"></input>
    </div>)
} 