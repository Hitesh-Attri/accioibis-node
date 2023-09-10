import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

const Home = () => {
  const [phnNumber, setPhnNo] = useState("");
  const [loading, setLoading] = useState(false);

  const number = useRef(phnNumber);

  useEffect(() => {
    number.current.focus();
  }, []);

  const handleCall = () => {
    if (/^[6-9]\d{9}$/.test(phnNumber)) {
      toast.success(phnNumber);
    } else {
      toast.error("Invalid Phone Number");
    }
  };

  return (
    <div className="bg-slate-600 h-screen w-screen flex justify-center items-center">
      <InputGroup sx={{ width: "20%" }}>
        <InputLeftAddon children="+91" />
        <Input
          ref={number}
          sx={{ backgroundColor: "#f2f5f3" }}
          maxLength={10}
          type="tel"
          placeholder="phone number"
          value={phnNumber}
          onChange={(e) => setPhnNo(e.target.value.replace(/[^0-9]+/, ""))}
        />
        <Button
          isLoading={loading}
          onClick={() => handleCall()}
          style={{ marginLeft: 7 }}
        >
          Call
        </Button>
      </InputGroup>
    </div>
  );
};

export default Home;
