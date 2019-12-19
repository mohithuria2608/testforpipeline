local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function get_address(stream, isActive)
   local function isActive_filter(rec)
      local val = rec['isActive']
      if val == isActive then
         return true
      else
         return false
      end
   end

  return stream:filter(isActive_filter):map(rec_to_map)
end

