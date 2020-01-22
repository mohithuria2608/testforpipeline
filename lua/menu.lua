local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function get_menu(stream, lang)
   local function language_filter(rec)
      local val = rec['language']
      if val == lang then
         return true
      else
         return false
      end
   end

  return stream:filter(language_filter):map(rec_to_map)
end