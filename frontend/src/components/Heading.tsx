import { Link } from "react-router-dom";

interface Header {
    header: string;
    subheader: string;
    to: string
    To: string
}

export const Heading = (props:Header) =>{
    return (<div>
        <label className="block text-3xl font-extrabold text-orange-500">{props.header}</label>
        <label className="text-gray-400">{props.subheader}</label>
        <Link className="underline ml-1.5 text-gray-400" to={props.To}>{props.to}</Link>
    </div>)
}