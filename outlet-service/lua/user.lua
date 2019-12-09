local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function check_phone_exist(stream, cCode)
   local function cCode_filter(rec)
      local val = rec['cCode']
      if val == cCode then
         return true
      else
         return false
      end
   end

  return stream:filter(cCode_filter):map(rec_to_map)
end

function check_social_key(stream, medium, socialKey)
   local function medium_filter(rec)
      local val = rec['medium']
      if val == medium then
         return true
      else
         return false
      end
   end
   local function socialKey_filter(rec)
      local val = rec['socialKey']
      if val == socialKey then
         return true
      else
         return false
      end
   end

return stream:filter(medium_filter):filter(socialKey_filter):map(rec_to_map)
end