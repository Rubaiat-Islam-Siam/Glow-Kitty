import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const SignUp = () => {
    const [showPass,setShowPass] = useState(null)
    const [formData,setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleChange =(e)=> {
        const {name,value} = e.target;
        setFormData((prev)=> ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit =  async (e)=> {
        e.preventDefault()
        console.log(formData)
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/user/register`,formData,{
                headers: {
                    "Content-Type":"application/json"
                }
            })

            if(res.data.success){
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='flex justify-center items-center bg-pink-100 min-h-screen'>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Log in</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 ">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange = {handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange = {handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                    onChange = {handleChange}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type={showPass? "text" : "password"}
                  placeholder="Create a strong password"
                  required 
                  value={formData.password}
                  onChange = {handleChange}
                />
                {
                    showPass ? <EyeOff onClick={()=> setShowPass(false)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 hover:cursor-pointer'/> : <Eye onClick={()=> setShowPass(true)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 hover:cursor-pointer '/> 
                }
              </div>

              {/* Confirm Password */}
              {/* <div className="grid gap-2 ">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type= {showPass? "text" : "password"}
                  placeholder="Re-enter your password"
                  required 
                />

              </div> */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full hover:cursor-pointer bg-pink-600 hover:bg-pink-500">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <p className='text-gray-700 text-sm'>Already Have an Account? <Link to={'/login'} className='hover:underline cursor-pointer text-pink-800'>Log in</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
