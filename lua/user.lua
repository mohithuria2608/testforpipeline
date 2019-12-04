local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
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
    local function deviceid_filter(rec)
      local val = rec['deviceid']
      if val == deviceid then
         return true
      else
         return false
      end
   end

   return stream:filter(phone_filter):filter(cCode_filter):filter(deviceid_filter):map(rec_to_map)
end

function check_device_id(stream, deviceid)
   local function deviceid_filter(rec)
      local val = rec['deviceid']
      if val == deviceid then
         return true
      else
         return false
      end
   end
   
   return stream:filter(deviceid_filter):map(rec_to_map)
end

function check_cCode_or_phnNo(stream, cCode, email)
    cCode = cCode or ""
    email = email or ""
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
    
    return stream:filter(cCode_filter):filter(email_filter):map(rec_to_map)
end