"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Country, State, City, ICity } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import signupImg from "@/public/assets/signupImg.jpg";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    userName: z.string().min(2, { message: "Username is required" }),
    phone: z.string().min(11, { message: "Phone number is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    gender: z.enum(["Male", "Female", "Other"]),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    interests: z
      .array(z.string())
      .min(1, { message: "Select at least one interest" }),
    accountType: z.enum(["Individual", "Business"]),
    description: z
      .string()
      .min(10, { message: "Description should be at least 10 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Location = {
  isoCode: string;
  name: string;
};

type SignUpFormValues = z.infer<typeof signupSchema>;

const SignUpForm = () => {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      interests: [],
    },
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  {
    /* Load states when country changes */
  }
  useEffect(() => {
    if (selectedCountry) {
      const statesData = State.getStatesOfCountry(selectedCountry);
      setStates(statesData);
      setCities([]);
      setValue("state", "");
      setValue("city", "");
    }
  }, [selectedCountry, setValue]);

  {
    /* Load Cities when State changes */
  }
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const citiesData = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(citiesData);
      setValue("city", "");
    }
  }, [selectedCountry, selectedState, setValue]);

  const selectedCountryData = countries.find(
    (c) => c.isoCode === selectedCountry
  );

  const getFlagUrl = (isoCode: string) =>
    `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`;

  {
    /* Submit Handler */
  }

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-full flex">
      {/* Left: Image */}
      <div className="relative hidden md:block w-1/2 h-full">
        <Image
          src={signupImg}
          alt="Sign Up"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Form */}
      <div className="h-full overflow-y-auto relative shadow-lg flex flex-col text-black scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-200 px-4 md:w-1/2 w-full">
        <Card className="flex flex-col border-none rounded-none shadow-none p-6 md:p-12 bg-transparent flex-grow">
          <div className="flex justify-center mb-0">
            <h1>Property Visualizer</h1>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-black">
              Create Your Account
            </CardTitle>
            <p className="text-sm mt-1 text-center text-gray-600">
              Join us and explore the platform
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-7"
            >
              {/* First Name */}
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register("userName")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.userName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  {...register("phone")}
                  className="border border-gray-300 shadow-md rounded-full"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <Label>Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4 mt-1"
                    >
                      {["Male", "Female", "Other"].map((gender) => (
                        <div
                          key={gender}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={gender}
                            id={gender}
                            className="border border-gray-300 shadow-md"
                          />
                          <Label htmlFor={gender}>{gender}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Country Autocomplete Select */}
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between flex items-center border px-3 py-2 rounded-full bg-transparent shadow-md border-gray-300",
                        errors.country && "border-red-500"
                      )}
                    >
                      {selectedCountryData ? (
                        <span className="flex items-center gap-2">
                          <Image
                            src={getFlagUrl(selectedCountryData.isoCode)}
                            alt={selectedCountryData.name}
                            width={24}
                            height={16}
                            unoptimized
                            className="h-5 w-6 rounded-sm object-cover"
                          />
                          {selectedCountryData.name}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Select Country
                        </span>
                      )}
                      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.isoCode}
                            value={country.name}
                            onSelect={() => {
                              setValue("country", country.isoCode, {
                                shouldValidate: true,
                              });
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country.isoCode
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <Image
                              src={getFlagUrl(country.isoCode)}
                              alt={country.name}
                              width={20}
                              height={14}
                              unoptimized
                              className="h-4 w-5 rounded-sm mr-2 object-cover"
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* State Select */}
              <div>
                <Select
                  onValueChange={(val) =>
                    setValue("state", val, { shouldValidate: true })
                  }
                  value={watch("state")}
                >
                  <SelectTrigger
                    className={cn(
                      "border border-gray-300 rounded-full shadow-md",
                      errors.state && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              {/* City Select */}
              <div>
                <Select
                  onValueChange={(val) =>
                    setValue("city", val, { shouldValidate: true })
                  }
                  value={watch("city")}
                >
                  <SelectTrigger
                    className={cn(
                      "border border-gray-300 rounded-full shadow-md",
                      errors.city && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Interests - Checkboxes */}
              <div>
                <Label>Interests</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Real Estate",
                    "Investment",
                    "Property Management",
                    "Buying",
                    "Selling",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name="interests"
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value?.includes(interest)}
                            onCheckedChange={(checked) => {
                              const newValues = checked
                                ? [...field.value, interest]
                                : field.value.filter((i) => i !== interest);
                              field.onChange(newValues);
                            }}
                            id={interest}
                            className="border border-gray-300 shadow-sm"
                          />
                        )}
                      />
                      <Label htmlFor={interest}>{interest}</Label>
                    </div>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.interests.message}
                  </p>
                )}
              </div>

              {/* Account Type */}
              <div>
                <Label>Account Type</Label>
                <Controller
                  control={control}
                  name="accountType"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4 mt-1"
                    >
                      {["Individual", "Business"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={type}
                            id={type}
                            className="border border-gray-300 shadow-md"
                          />
                          <Label htmlFor={type}>{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.accountType && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.accountType.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="border border-gray-300 shadow-md mt-1"
                  rows={7}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4 hover:bg-red-600 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    Creating...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Footer link */}
              <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
