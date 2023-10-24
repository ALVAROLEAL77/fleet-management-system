import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Field } from "formik";

export default function Search({ setSelected, setFieldValue, name }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <PlacesAutocomplete
      setSelected={setSelected}
      setFieldValue={setFieldValue}
      name={name}
    />
  );
}

const PlacesAutocomplete = ({ setSelected, setFieldValue, name }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    setFieldValue(name, address);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const oC = (e) => {
    if (value.length > e.target.value.length) {
      setSelected(undefined);
    }
    setValue(e.target.value);
    setFieldValue(name, e.target.value);
  };
  return (
    <Combobox onSelect={handleSelect}>
      <Field
        onChange={oC}
        disabled={!ready}
        type="text"
        className="h-10 w-full rounded-md bg-transparent border-double text-secondary border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm "
        placeholder="Search an address"
        name={name}
      />

      <ComboboxList className="bg-tertiary bg-opacity-20 backdrop-blur-3xl ">
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
          ))}
      </ComboboxList>
    </Combobox>
  );
};
