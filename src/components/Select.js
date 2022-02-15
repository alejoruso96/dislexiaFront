import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Select(props) {
    const [children, setChildren] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
            url: "http://localhost:4000/api/user/children",
        })
            .then((res) => {
                let data = res.data.map((item) => {
                    return {
                        display: `${item.nombre} ${item.apellido}`,
                        key: `${item._id}`
                    };
                });
                localStorage.setItem("childrenId", data[0].key);
                setChildren(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.isShown]);

    const handleChangeSelect = (event) => {
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        localStorage.setItem("childrenId", id);
    }

    return (
        <>
            <div className="relative inline-block w-full text-gray-700">
                <select
                    className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    placeholder="Regular input"
                    onChange={(e) => handleChangeSelect(e)}
                >
                    {children.map((item) => {
                        return <option id={item.key} key={item.key}>{item.display}</option>;
                    })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </>
    );
}
