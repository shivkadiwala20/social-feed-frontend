// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
// import Loader from 'react-spinner-loader';
const SignUp = () => {
  return (
    <div className="flex flex-col mt-4">
    <header className="place-self-center text-xl font-bold flex py-4 text-blue-600">
        WebOSocial
    </header>

    <div className="flex flex-col pb-1 shadow-none bg-slate-100 rounded-lg w-1/4 mx-auto min-w-max">

        <div className="z-20">
            {/* <Loader show={""} type="body" /> */}
        </div>

        <form className="mx-8 flex flex-col">

            <h2 className="my-6 text-left text-slate-900 text-lg">Sign Up</h2>

            <label className="text-sm text-left py-1 text-slate-900">First Name<span className="form_label"></span>
                <input
                    name="firstName"
                    value=""
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="text"
                    required={true}
                    onChange={(e)=>e.target.value}
                />
            </label>

            <label className="text-sm  text-left py-1 text-slate-900">Last Name<span className="form_label"></span>
                <input
                    name="lastName"
                    value={""}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="text"
                    required={true}
                    onChange={(e)=>e.target.value}
                />

            </label>

            <label className="text-sm text-left py-1 text-slate-900">User Name<span className="form_label"></span>
                <input
                    name="username"
                    value=""
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="text"
                    required={true}
                    // onChange={(e) => setFormInputs({ ...formInputs, username: e.target.value })}
                    onChange={(e)=>e.target.value}
                />

            </label>

            <label className="relative text-sm text-left py-1 text-slate-900">Password<span className="form_label"></span>
                <input
                    name="password"
                    // value={password}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    // type={showHideOne ? "text" : "password"}
                    required={true}
                    // onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
                    onChange={(e)=>e.target.value}
                />

                <i className="absolute right-2 bottom-2.5 text-slate-500 fa-solid fa-eye show_hide_btn"
             >
                </i> 
                    <i className="absolute right-2 bottom-2.5 text-slate-500 fa-solid fa-eye-slash show_hide_btn"
                    >
                    </i>

            </label>

            <label className="relative text-sm text-left py-1 text-slate-900">Confirm Password<span className="form_label"></span>
                <input
                    name="confirmPassword"
                    // value={confirmPassword}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    // type={showHideTwo ? "text" : "password"}
                    required={true}
                    
                />

                <i className="absolute right-2 bottom-2.5 text-slate-500 fa-solid fa-eye show_hide_btn"
                    >
                </i> 
                    <i className="absolute right-2 bottom-2.5 text-slate-500 fa-solid fa-eye-slash show_hide_btn"
                        >
                    </i>

            </label>

            <button className="my-3 text-x cursor-pointer text-center py-1 border2 bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={(e) => formSignUpHandler(e)} >Sign Up</button>

            <p className="my-2 text-center text-sm self-center text-blue-700 font-medium">
                <Link to="/">Already have an account {">"} </Link>
            </p>

        </form>
    </div>
</div>
  )
}

export default SignUp
