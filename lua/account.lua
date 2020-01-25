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