/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@/assets/svg/closeIcon.svg";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import { SVGIcon } from "@/assets/svg";
import { useRouter } from "next/navigation";
import { setDeliveryLocation } from "@/redux/slices/globaCache.slice";
import { useAppDispatch } from "@/redux/hooks";
interface DeliveryLocationModalProps {
  onClose: () => void;
  open: boolean;
}
/* static data */
const countries = [
  "Australia",
  "United Kingdom",
  "Italy",
  "Canada",
  "Austria",
  "Portugal",
  "Finland",
  "Malaysia",
];
/* country selection styles */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(country: string, countryName: string, theme: Theme) {
  return {
    fontWeight: countryName.includes(country)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function DeliveryLocationModal({ onClose, open }: DeliveryLocationModalProps) {
  const theme = useTheme();
  const [zip, setZip] = useState<string>("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    dispatch(setDeliveryLocation(countryName));
    onClose();
  };

  const handleChange = (event: any) => {
    setZip(event.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 10 seconds timeout
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Invalid zip code");
      }

      const data = await response.json();
      const city = data.places[0]["place name"] || data.places[0]["state"];
      dispatch(setDeliveryLocation(`${city} ${zip}`));
      setError(null);
      onClose();
    } catch (error: any) {
      if (error.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Invalid zip code. Please enter a valid US zip code.");
      }
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent<typeof countryName>) => {
    // const {
    //   target: { value },
    // } = event;
    setCountryName(event.target.value);
    console.log(countryName);
  };

  return (
    <Transition appear show={open}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6 mx-auto min-w-[400px]   max-w-[580px]"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-auto w-auto max-h-full  min-w-[400px] max-w-[580px]">
            <Box className="relative delivery-location-modal p-8">
              <div>
                <div
                  onClick={onClose}
                  className="absolute right-6 cursor-pointer w-7 h-7 btn-close"
                >
                  <CloseIcon />
                </div>
                <div className="mb-2">
                  <SVGIcon.RedLocationIcon className="mx-auto" />
                </div>
                <div className="text-center">
                  <h3
                    id="modal-modal-title"
                    className="font-geist font-bold text-2xl text-black mb-2"
                  >
                    Choose your location
                  </h3>
                  <p className="text-black font-geist mb-3 text-sm">
                    Delivery options and delivery speeds may vary for different
                    locations
                  </p>
                  <button
                    onClick={() => router.push("/login2")}
                    className="w-full py-3 mb-5 text-white font-semibold border border-[#5C34FC] rounded-full bg-[#5C34FC]"
                  >
                    Sign in to see your addresses
                  </button>
                </div>

                <div className="border-2 border-[#E0E0E0] rounded-xl p-4">
                  <div>
                    <p className="mb-2">Enter a US zip code</p>
                    <form
                      className="flex items-center relative"
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        id="zip"
                        name="zip"
                        variant="outlined"
                        value={zip}
                        placeholder="Choose an option"
                        onChange={handleChange}
                        className="w-full rounded focus:ring-0"
                        InputProps={{
                          style: {
                            border: "none",
                            background: "#F1F1F1",
                          },
                          classes: {
                            notchedOutline: "border-none",
                          },
                        }}
                      />
                      <button
                        type="submit"
                        className="absolute text-center text-[#252525] font-semibold right-2 border-2 border-[#737373] rounded-full py-2 px-4"
                      >
                        Apply
                      </button>
                    </form>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>

                  <div className="border-t-2 my-6 border-[#E0E0E0]"></div>

                  <div>
                    <p className="mb-2">Ship outside the US</p>
                    <div className="bg-[#EFEBFF] rounded-[4px]">
                      <FormControl className="w-full">
                        <InputLabel id="demo-multiple-name-label">
                          Choose an option
                        </InputLabel>
                        <Select
                          className="focus:border-[#5C34FC]"
                          value={countryName}
                          onChange={handleChangeSelect}
                          input={
                            <OutlinedInput
                              label="Country"
                              sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                },
                              }}
                            />
                          }
                          MenuProps={MenuProps}
                        >
                          {countries.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, countryName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="">
                    <button
                      onClick={handleSave}
                      className="text-[#5C34FC] text-sm font-semibold
                       w-full border-[0.3px] rounded-[32px] border-[#5C34FC] bg-[#EFEBFF] py-3 mt-4"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default DeliveryLocationModal;
