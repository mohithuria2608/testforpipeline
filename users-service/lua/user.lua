local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

local function deviceid_filter(rec)
   local val = rec['deviceid']
   if val == deviceid then
      return true
   else
      return false
   end
end

function check_user_exist(stream, phnNo, cCode, deviceid)
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
    
    return stream:filter(phone_filter):filter(cCode_filter):filter(deviceid_filter):map(rec_to_map)
end

function check_device_id(stream, deviceid)
    
    
    return stream:filter(deviceid_filter):map(rec_to_map)
end

function check_email_or_phnNo(stream, phnNo, cCode, email)
    phnNo = phnNo or ""
    cCode = cCode or ""
    email = email or ""
    local function phnNo_filter(rec)
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
     local function email_filter(rec)
        local val = rec['email']
        if val == email then
           return true
        else
           return false
        end
     end
    
    return stream:filter(phone_filter):filter(cCode_filter):filter(email_filter):map(rec_to_map)
end