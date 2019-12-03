local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function check_user_exist(stream, phnNo, cCode, deviceid, otp, otpExpAt)
    otp = otp or 0
    otpExpAt = otpExpAt or 0
    local function phone_filter(rec)
        local val = rec['phnNo']
        if val == phnNo then
            return true
        else
            return false
        end
    end
    local function cCode_filter(rec)
       local val = rec['cCode']
       if val == cCode then
          return true
       else
          return false
       end
    end
    local function deviceid_filter(rec)
       local val = rec['deviceid']
       if val == deviceid then
          return true
       else
          return false
       end
    end
    -- local function otp_filter(rec)
    --     if not (otp == 0) then
    --         local valOtp = rec['otp']
    --         local valOtpExpAt = rec['otpExpAt']
    --         if valOtp == otp and valOtpExpAt < otpExpAt then
    --            return true
    --         else
    --            return false
    --         end
    --     else
    --         return true
    --     end
    --  end
    
    return stream:filter(phone_filter):filter(cCode_filter):filter(deviceid_filter):map(rec_to_map)
end