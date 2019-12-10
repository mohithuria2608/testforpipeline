local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function check_store_id(stream, storeId)
   local function storeId_filter(rec)
      local val = rec['storeId']
      if val == storeId then
         return true
      else
         return false
      end
   end

  return stream:filter(storeId_filter):map(rec_to_map)
end